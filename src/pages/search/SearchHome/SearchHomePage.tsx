import { ChangeEvent, useState } from 'react';
import styles from './SearchHome.module.css';
import useGetSearchUserByKeyword from '../../../hooks/queries/useGetSearchUserByKeyword';
import ProfileCard from '../../../components/common/ProfileCard/ProfileCard';
import { Link } from 'react-router-dom';
import { numbers } from '../../../constants';
import useDebounce from '../../../hooks/useDebounce';

function SearchHomePage() {
  const [text, setText] = useState('');

  const debouncedText = useDebounce(text, numbers.DEBOUNCE_TIME);

  const { data: users } = useGetSearchUserByKeyword(debouncedText);

  const handleChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <section className={styles.container}>
      <input
        className={styles.searchInput}
        type="text"
        value={text}
        placeholder="Find user for following"
        onChange={e => handleChangeText(e)}
      />
      <ul className={styles.userList}>
        {users &&
          users.map(user => (
            <li className={styles.userItem} key={user.id}>
              <Link to={`/user/${user.email}`} state={{ email: user.email }}>
                <ProfileCard user={user} />
              </Link>
            </li>
          ))}
      </ul>
    </section>
  );
}

export default SearchHomePage;
