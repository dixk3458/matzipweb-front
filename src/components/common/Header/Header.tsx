import { Link, useLocation } from 'react-router-dom';
import useAuth from '../../../hooks/queries/useAuth';

import styles from './Header.module.css';
import SearchIcon from '../../icon/SearchIcon';
import MapIcon from '../../icon/MapIcon';
import MapFillIcon from '../../icon/MapFillIcon';
import GridIcon from '../../icon/GridIcon';
import GridFillIcon from '../../icon/GridFillIcon';
import SearchFillIcon from '../../icon/SearchFillIcon';
import UserIcon from '../../icon/UserIcon';
import UserFillIcon from '../../icon/UserFillIcon';
import LogoutIcon from '../../icon/LogoutIcon';

const items = [
  {
    path: '/map',
    icon: <MapIcon size={30} />,
    fillIcon: <MapFillIcon size={30} />,
  },
  {
    path: '/feed',
    icon: <GridIcon size={30} />,
    fillIcon: <GridFillIcon size={30} />,
  },
  {
    path: '/search',
    icon: <SearchIcon size={30} />,
    fillIcon: <SearchFillIcon size={30} />,
  },
];

function Header() {
  const { isLogin, logoutMutation, getProfileQuery } = useAuth();
  const { email } = getProfileQuery.data ?? {};

  const handleClickLogoutButton = () => {
    logoutMutation.mutate(null);
  };

  const { pathname } = useLocation();

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
          {items.map(item => (
            <li className={styles.item}>
              <Link to={item.path}>
                {pathname === item.path ? item.fillIcon : item.icon}
              </Link>
            </li>
          ))}
          <li className={styles.item}>
            <Link to={`/user/${email}`} state={{ email: email }}>
              {pathname.includes('/user') ? (
                <UserFillIcon size={30} />
              ) : (
                <UserIcon size={30} />
              )}
            </Link>
          </li>
          <li className={styles.item}>
            <button onClick={() => logoutMutation.mutate(null)}>
              <LogoutIcon size={30} />
            </button>
          </li>
        </ul>
      )}
    </header>
  );
}

export default Header;
