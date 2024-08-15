import useGetMarkerCategory from '../../../hooks/queries/useGetMarkerCategory';
import CustomButton from '../../common/CustomButton/CustomButton';
import SettingIcon from '../../icon/SettingIcon';
import styles from './MarkerLegend.module.css';

interface MarkerLegendProps {
  handleClickSettingButton: () => void;
}

function MarkerLegend({ handleClickSettingButton }: MarkerLegendProps) {
  const { data: markerCategories } = useGetMarkerCategory() ?? {};

  if (!markerCategories) {
    return <div>Loading...</div>; // 데이터가 없을 경우 로딩 상태 표시
  }

  const categories = Object.entries(markerCategories)
    .map(([color, title]) => ({
      color: color,
      title: title,
    }))
    .filter(category => category.title.length > 0); // 있는것만

  return (
    <div className={styles.container}>
      <ul className={styles.itemList}>
        {categories.map(({ color, title }) => (
          <li className={styles.item} key={color}>
            <span className={`${styles.color} ${styles[color]}`} />
            <p className={styles.title}>{title}</p>
          </li>
        ))}
      </ul>
      <CustomButton
        icon={<SettingIcon />}
        onClick={() => handleClickSettingButton()}
        size="small"
      />
    </div>
  );
}

export default MarkerLegend;
