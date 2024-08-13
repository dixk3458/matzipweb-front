import { DetailUser } from '../../../types';

import styles from './ProfileMeta.module.css';

interface ProfileMetaProps {
  user: DetailUser;
}

function ProfileMeta({ user }: ProfileMetaProps) {
  return (
    <ul className={styles.container}>
      <li className={styles.item}>
        <p
          className={`${styles.count} ${
            user.posts.length === 0 && styles.empty
          }`}
        >
          {user.posts.length}
        </p>
        <p className={styles.title}>게시물</p>
      </li>
      <li className={styles.item}>
        <p
          className={`${styles.count} ${
            user.followers.length === 0 && styles.empty
          }`}
        >
          {user.followers.length}
        </p>
        <p className={styles.title}>팔로워</p>
      </li>
      <li className={styles.item}>
        <p
          className={`${styles.count} ${
            user.following.length === 0 && styles.empty
          }`}
        >
          {user.following.length}
        </p>
        <p className={styles.title}>팔로잉</p>
      </li>
    </ul>
  );
}

export default ProfileMeta;
