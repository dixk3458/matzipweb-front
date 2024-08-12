import { ChangeEvent, useState } from 'react';
import styles from './SearchHome.module.css';
import useGetSearchUserByKeyword from '../../../hooks/queries/useGetSearchUserByKeyword';
import ProfileCard from '../../../components/common/ProfileCard/ProfileCard';
import { Link } from 'react-router-dom';

function SearchHomePage() {
  const [text, setText] = useState('');

  const { data: users } = useGetSearchUserByKeyword(text);

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
              <Link to={`/user/${user.email}`}>
                <ProfileCard user={user} />
              </Link>
            </li>
          ))}
      </ul>
    </section>
  );
}

export default SearchHomePage;
