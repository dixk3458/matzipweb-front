import { useCallback, useEffect, useState } from 'react';
import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api';
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
import useGetAllMarkersByUserId from '../../../hooks/queries/useGetAllMarkersByUserId';
import CustomMarker from '../../../components/map/CustomMarker/CustomMarker';
import EditMarkerCategoryForm from '../../../components/map/EditMarkerCategoryForm/EditMarkerCategoryForm';
import MarkerLegend from '../../../components/map/MarkerLegend/MarkerLegend';
import useCurrentMarkerFilterStore from '../../../store/useCurrentMarkerFilterStore';
import SuspenseLoading from '../../../components/common/SuspenseLoading/SuspenseLoading';

function MapHomePage() {
  const { getProfileQuery } = useAuth();
  const { id: userId } = getProfileQuery.data! || {};

  const markers = useGetAllMarkersByUserId(userId).data || [];

  const [isOpenModal, setIsOpenModal] = useState(false);

  const [isOpenMarkerModal, setIsOpenMarkerModal] = useState(false);

  const {
    currentLocation,
    selectedLocation,
    setCurrentLocation,
    setSelectedLocation,
  } = useLocationStore();

  const { currentMarkerFilter } = useCurrentMarkerFilterStore();

  const filteredMarkers =
    currentMarkerFilter.length === 0
      ? markers
      : markers.filter(marker => currentMarkerFilter.includes(marker.color));

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
    if (!selectedLocation) {
      alert(messages.NOT_SELECTED_LOCATION);
      return;
    }
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
    return <SuspenseLoading />;
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
        {currentLocation && (
          <MarkerF
            position={currentLocation}
            icon={{
              url: '/assets/cloudLogo.png',
              scaledSize: new google.maps.Size(40, 40),
            }}
          />
        )}
        {selectedLocation && <MarkerF position={selectedLocation} />}
        {filteredMarkers.length > 0 &&
          filteredMarkers.map(marker => (
            <CustomMarker
              key={marker.id}
              id={marker.id}
              position={{ lat: marker.latitude, lng: marker.longitude }}
              color={marker.color}
              score={marker.score}
            />
          ))}
      </GoogleMap>
      <MarkerLegend
        handleClickSettingButton={() => setIsOpenMarkerModal(true)}
      />
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
          icon={<LocationIcon />}
          size="small"
          variant="filled"
          onClick={handleClickLocationButton}
        />
        <CustomButton
          icon={<PencilIcon />}
          size="small"
          variant="filled"
          onClick={handleClickPencilButton}
        />
      </div>
      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal(false)}>
          <AddPost onClose={() => setIsOpenModal(false)} />
        </Modal>
      )}
      {isOpenMarkerModal && (
        <Modal onClose={() => setIsOpenMarkerModal(false)}>
          <EditMarkerCategoryForm onClose={() => setIsOpenMarkerModal(false)} />
        </Modal>
      )}
    </section>
  );
}

export default MapHomePage;
