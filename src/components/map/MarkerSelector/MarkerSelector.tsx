import { markerColor } from '../../../constants';
import { MarkerColor } from '../../../types';
import styles from './MarkerSelector.module.css';

interface MarkerSelectorProps {
  selectedMarkerColor: MarkerColor;
  handleUpdateMarkerColor: (color: MarkerColor) => void;
}

const colors: MarkerColor[] = [
  markerColor.RED,
  markerColor.BLUE,
  markerColor.YELLOW,
  markerColor.GREEN,
  markerColor.PURPLE,
];

function MarkerSelector({
  selectedMarkerColor,
  handleUpdateMarkerColor,
}: MarkerSelectorProps) {
  return (
    <section className={styles.container}>
      <p className={styles.titleText}>마커 색상</p>
      <ul className={styles.markerContainer}>
        {colors.map(color => (
          <li
            key={color}
            className={`${styles.list} ${
              selectedMarkerColor === color &&
              `${styles.selectedList} ${styles[`${color}List`]}`
            }`}
            onClick={() => handleUpdateMarkerColor(color)}
          >
            <span className={`${styles.color} ${styles[color]}`} />
            <p className={styles.colorText}>{color}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default MarkerSelector;
