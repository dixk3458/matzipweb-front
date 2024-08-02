import { create } from 'zustand';
import { numbers } from '../constants';

type LocationStore = {
  currentLocation: google.maps.LatLngLiteral | null;
  setCurrentLocation: (location: google.maps.LatLngLiteral) => void;
  selectedLocation: google.maps.LatLngLiteral | null;
  setSelectedLocation: (location: google.maps.LatLngLiteral) => void;
};

const useLocationStore = create<LocationStore>(set => ({
  currentLocation: {
    lat: numbers.DEFAULT_LATITUDE,
    lng: numbers.DEFAULT_LONGITUDE,
  },
  setCurrentLocation: location =>
    set(state => ({ ...state, currentLocation: location })),

  selectedLocation: null,
  setSelectedLocation: location =>
    set(state => ({ ...state, selectedLocation: location })),
}));

export default useLocationStore;
