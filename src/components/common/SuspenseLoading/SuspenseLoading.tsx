import CustomLoadingSpinner from '../CustomLoadingSpinner/CustomLoadingSpinner';
import styles from './SuspenseLoading.module.css';

function SuspenseLoading() {
  return (
    <div className={styles.container}>
      <CustomLoadingSpinner />
    </div>
  );
}

export default SuspenseLoading;
