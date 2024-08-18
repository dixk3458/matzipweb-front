import { OverlayViewF } from '@react-google-maps/api';
import styles from './CustomMarker.module.css';
import MarkerIcon from '../../icon/MarkerIcon';
import { MarkerColor } from '../../../types';
import { MouseEvent, useState } from 'react';
import MarkerDialog from '../MarkerDialog/MarkerDialog';

interface CustomMarkerProps {
  id: number;
  position: google.maps.LatLngLiteral;
  color: MarkerColor;
  score: number;
}

function CustomMarker({ id, position, color, score }: CustomMarkerProps) {
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const onClickCloseButton = (e: MouseEvent) => {
    e.stopPropagation();
    setIsOpenDialog(false);
  };

  return (
    <OverlayViewF key={id} position={position} mapPaneName="overlayMouseTarget">
      <div
        className={styles.markerContainer}
        onClick={() => setIsOpenDialog(true)}
      >
        <MarkerIcon size={30} color={color} />
        <span className={styles.scoreText}>{score}</span>
        {isOpenDialog && (
          <MarkerDialog
            postId={id}
            onClickCloseButton={e => onClickCloseButton(e)}
          />
        )}
      </div>
    </OverlayViewF>
  );
}

export default CustomMarker;
