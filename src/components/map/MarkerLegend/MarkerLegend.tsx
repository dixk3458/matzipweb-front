import CustomButton from '../../common/CustomButton/CustomButton';
import SettingIcon from '../../icon/SettingIcon';
import styles from './MarkerLegend.module.css';

interface MarkerLegendProps {
  handleClickSettingButton: () => void;
}

function MarkerLegend({handleClickSettingButton}: MarkerLegendProps) {
  return (
    <div className={styles.container}>
      <CustomButton
        icon={<SettingIcon />}
        onClick={() => handleClickSettingButton()}
      />
    </div>
  );
}

export default MarkerLegend;
