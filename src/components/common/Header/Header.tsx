import { Link, useLocation } from 'react-router-dom';
import useAuth from '../../../hooks/queries/useAuth';
import CustomButton from '../CustomButton/CustomButton';

import styles from './Header.module.css';

function Header() {
  const { isLogin, logoutMutation } = useAuth();

  const handleClickLogoutButton = () => {
    logoutMutation.mutate(null);
  };

  const { pathname } = useLocation();
  console.log(pathname);

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
          <li className={styles.buttonListItem}>
            <Link
              className={`${styles.buttonListItemText} ${
                pathname === '/map' && styles.active
              }`}
              to={'/map'}
            >
              Map
            </Link>
          </li>
          <li className={styles.buttonListItem}>
            <Link
              className={`${styles.buttonListItemText} ${
                pathname === '/feed' && styles.active
              }`}
              to={'/feed'}
            >
              Feed
            </Link>
          </li>
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
