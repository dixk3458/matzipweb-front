import { useRef, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import useAuth from '../../../hooks/queries/useAuth';
import CustomButton from '../../../components/common/CustomButton/CustomButton';
import PlusIcon from '../../../components/icon/PlusIcon';
import PencilIcon from '../../../components/icon/PencilIcon';
import MinusIcon from '../../../components/icon/MinusIcon';

function MapHomePage() {
  const { getProfileQuery } = useAuth();

  const mapRef = useRef<google.maps.Map | null>(null);

  const [selectedLocation, setSelectedLocation] =
    useState<google.maps.LatLngLiteral | null>(null);

  const handleClickMap = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      setSelectedLocation({ lat: event.latLng.lat(), lng: event.latLng.lng() });
      console.log(selectedLocation);
    }
  };

  const handleClickPlusButton = () => {
    if (mapRef.current) {
      mapRef.current.setZoom(mapRef.current.getZoom()! + 1);
    }
  };

  const handleClickMinusButton = () => {
    if (mapRef.current) {
      mapRef.current.setZoom(mapRef.current.getZoom()! - 1);
    }
  };

  const handleClickPencilButton = () => {
    console.log(selectedLocation);
  };

  return (
    <section>
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY!}>
        <GoogleMap
          onLoad={map => {
            mapRef.current = map;
          }}
          mapContainerStyle={containerStyle}
          center={center}
          zoom={12}
          onClick={event => handleClickMap(event)}
          options={{
            disableDefaultUI: true,
          }}
        >
          {selectedLocation && <Marker position={selectedLocation} />}
        </GoogleMap>
        <div>
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
        </div>
      </LoadScript>
    </section>
  );
}

const containerStyle: React.CSSProperties = {
  width: '100%',
  height: '100vh',
};

const center = {
  lat: 37.5665,
  lng: 126.978,
};

export default MapHomePage;
