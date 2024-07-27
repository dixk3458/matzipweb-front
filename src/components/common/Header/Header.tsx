import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import CustomButton from '../CustomButton/CustomButton';

function Header() {
  return (
    <header className={styles.container}>
      <Link to={'/'} className={styles.logoContainer}>
        <img
          className={styles.logoImage}
          src="./assets/cloudLogo.png"
          alt="Woong's Matzip"
        />
        <h1 className={styles.logoText}>Woong's Matzip</h1>
      </Link>
      {/* <ul className={styles.buttonContainer}></ul> */}
    </header>
  );
}

export default Header;
