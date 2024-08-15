import useGetMarkerCategory from '../../../hooks/queries/useGetMarkerCategory';
import CustomButton from '../../common/CustomButton/CustomButton';
import CustomLoadingSpinner from '../../common/CustomLoadingSpinner/CustomLoadingSpinner';
import SettingIcon from '../../icon/SettingIcon';
import styles from './MarkerLegend.module.css';
import { MarkerColor } from '../../../types';
import useCurrentMarkerFilterStore from '../../../store/useCurrentMarkerFilterStore';

interface MarkerLegendProps {
  handleClickSettingButton: () => void;
}

function MarkerLegend({ handleClickSettingButton }: MarkerLegendProps) {
  const { currentMarkerFilter, setCurrentMarkerFilter } =
    useCurrentMarkerFilterStore();
  const { data: markerCategories } = useGetMarkerCategory() ?? {};

  if (!markerCategories) {
    return (
      <div className={styles.container}>
        <CustomLoadingSpinner />
      </div>
    );
  }

  const categories = Object.entries(markerCategories).map(([color, title]) => ({
    color: color as MarkerColor,
    title: title,
  }));

  const handleClickCheckBox = (color: MarkerColor) => {
    setCurrentMarkerFilter(color);
  };

  return (
    <div className={styles.container}>
      <ul className={styles.itemList}>
        {categories.map(({ color, title }) => (
          <li className={styles.item} key={color}>
            <span className={`${styles.color} ${styles[color]}`} />
            <p className={styles.title}>{title}</p>
            <input
              type="checkbox"
              className={styles.checkBox}
              checked={currentMarkerFilter.includes(color)}
              onChange={() => handleClickCheckBox(color)}
            />
          </li>
        ))}
      </ul>
      <div className={styles.settingButton}>
        <CustomButton
          icon={<SettingIcon />}
          onClick={() => handleClickSettingButton()}
          size="small"
        />
      </div>
    </div>
  );
}

export default MarkerLegend;
