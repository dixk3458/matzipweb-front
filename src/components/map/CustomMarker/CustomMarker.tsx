import { OverlayViewF } from '@react-google-maps/api';

import styles from './CustomMarker.module.css';
import MarkerIcon from '../../icon/MarkerIcon';
import { MarkerColor } from '../../../types';

interface CustomMarkerProps {
  id: number;
  position: google.maps.LatLngLiteral;
  color: MarkerColor;
  score: number;
}

function CustomMarker({ id, position, color, score }: CustomMarkerProps) {
  return (
    <OverlayViewF key={id} position={position} mapPaneName="overlayMouseTarget">
      <div className={styles.markerContainer}>
        <MarkerIcon size={30} color={color} />
        <span className={styles.scoreText}>{score}</span>
      </div>
    </OverlayViewF>
  );
}

export default CustomMarker;
