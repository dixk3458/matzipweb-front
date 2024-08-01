import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import useAuth from '../../../hooks/queries/useAuth';
import CustomButton from '../CustomButton/CustomButton';

function Header() {
  const { isLogin, logoutMutation } = useAuth();

  const handleClickLogoutButton = () => {
    logoutMutation.mutate(null);
  };

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
      {isLogin && (
        <ul className={styles.buttonContainer}>
          <li>
            <CustomButton
              label="로그아웃"
              size="small"
              variant="outlined"
              onClick={handleClickLogoutButton}
            />
          </li>
        </ul>
      )}
    </header>
  );
}

export default Header;
