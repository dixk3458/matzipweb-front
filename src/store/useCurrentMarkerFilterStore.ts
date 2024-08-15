import { create } from 'zustand';
import { MarkerColor } from '../types';

type CurrentMarkerFilterStore = {
  currentMarkerFilter: MarkerColor[];
  setCurrentMarkerFilter: (color: MarkerColor) => void;
};

const useCurrentMarkerFilterStore = create<CurrentMarkerFilterStore>(set => ({
  currentMarkerFilter: [],
  setCurrentMarkerFilter: (color: MarkerColor) =>
    set(state => ({
      ...state,
      currentMarkerFilter: state.currentMarkerFilter.includes(color)
        ? state.currentMarkerFilter.filter(
            filteredColor => filteredColor !== color
          )
        : [...state.currentMarkerFilter, color],
    })),
}));

export default useCurrentMarkerFilterStore;
