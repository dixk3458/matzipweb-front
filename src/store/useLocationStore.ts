import { create } from 'zustand';
import { numbers } from '../constants';

type LocationStore = {
  currentLocation: google.maps.LatLngLiteral | null;
  setCurrentLocation: (location: google.maps.LatLngLiteral) => void;
};

const useLocationStore = create<LocationStore>(set => ({
  currentLocation: {
    lat: numbers.DEFAULT_LATITUDE,
    lng: numbers.DEFAULT_LONGITUDE,
  },
  setCurrentLocation: location =>
    set(state => ({ ...state, currentLocation: location })),
}));

export default useLocationStore;
