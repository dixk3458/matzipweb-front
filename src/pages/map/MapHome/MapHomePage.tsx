import { useCallback, useEffect, useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import useAuth from '../../../hooks/queries/useAuth';
import CustomButton from '../../../components/common/CustomButton/CustomButton';
import PlusIcon from '../../../components/icon/PlusIcon';
import PencilIcon from '../../../components/icon/PencilIcon';
import MinusIcon from '../../../components/icon/MinusIcon';
import styles from './MapHomePage.module.css';
import { numbers } from '../../../constants';
import useLocationStore from '../../../store/useLocationStore';
import messages from '../../../constants/messages';
import LocationIcon from '../../../components/icon/LocationIcon';
import Modal from '../../../components/common/Modal/Modal';
import AddPost from '../../../components/map/AddPost/AddPost';

function MapHomePage() {
  const { getProfileQuery } = useAuth();

  const [isOpenModal, setIsOpenModal] = useState(false);

  const {
    currentLocation,
    selectedLocation,
    setCurrentLocation,
    setSelectedLocation,
  } = useLocationStore();

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY ?? '',
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const handleClickMap = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      setSelectedLocation({ lat: event.latLng.lat(), lng: event.latLng.lng() });
    }
  };

  const handleClickPlusButton = () => {
    if (map) {
      map.setZoom(map.getZoom()! + 1);
    }
  };

  const handleClickMinusButton = () => {
    if (map) {
      map.setZoom(map.getZoom()! - 1);
    }
  };

  const handleClickPencilButton = () => {
    setIsOpenModal(true);
  };

  const handleClickLocationButton = () => {
    if (map && currentLocation) {
      map.panTo(currentLocation);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCurrentLocation(location);
        },
        error => {
          console.error(error);
          alert(messages.CAN_NOT_GET_GEOLOCATION);
        }
      );
    } else {
      alert(messages.NOT_SUPPORTED_GEOLOCATION);
    }
  }, [setCurrentLocation]);

  useEffect(() => {
    if (map && currentLocation) {
      map.panTo(currentLocation);
    }
  }, [map, currentLocation]);

  if (!isLoaded) {
    return <p>로딩중...</p>;
  }

  if (loadError) {
    return <p>에러...</p>;
  }

  return (
    <section className={styles.container}>
      <GoogleMap
        mapContainerClassName={styles.mapContainer}
        center={
          currentLocation ?? {
            lat: numbers.DEFAULT_LATITUDE,
            lng: numbers.DEFAULT_LONGITUDE,
          }
        }
        zoom={numbers.ZOOM}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={handleClickMap}
        options={{
          disableDefaultUI: true,
        }}
      >
        {currentLocation && <Marker position={currentLocation} />}
        {selectedLocation && <Marker position={selectedLocation} />}
      </GoogleMap>
      <div className={styles.buttonContainer}>
        <CustomButton
          icon={<PlusIcon />}
          size="small"
          variant="filled"
          onClick={handleClickPlusButton}
        />
        <CustomButton
          icon={<MinusIcon />}
          size="small"
          variant="filled"
          onClick={handleClickMinusButton}
        />
        <CustomButton
          icon={<PencilIcon />}
          size="small"
          variant="filled"
          onClick={handleClickPencilButton}
        />
        <CustomButton
          icon={<LocationIcon />}
          size="small"
          variant="filled"
          onClick={handleClickLocationButton}
        />
      </div>
      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal(false)}>
          <AddPost onClose={() => setIsOpenModal(false)} />
        </Modal>
      )}
    </section>
  );
}

export default MapHomePage;
