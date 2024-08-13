import { useLocation } from 'react-router-dom';
import styles from './UserDetailPage.module.css';
import useAuth from '../../../hooks/queries/useAuth';
import useGetProfileByEmail from '../../../hooks/queries/useGetProfileByEmail';
import Avatar from '../../../components/common/Avatar/Avatar';
import ProfileMeta from '../../../components/user/ProfileMeta/ProfileMeta';
import CustomButton from '../../../components/common/CustomButton/CustomButton';
import FilterMenu, {
  Filter,
} from '../../../components/user/FilterMenu/FilterMenu';
import { useState } from 'react';

function UserDetailPage() {
  const location = useLocation();
  const { email } = location.state;

  const { getProfileQuery } = useAuth();
  const { email: profileEmail } = getProfileQuery.data ?? {};

  const isOwnProfile = email === profileEmail;

  const { data: currentProfile } = useGetProfileByEmail(email);
  const { data: myProfile } = useGetProfileByEmail(profileEmail!);

  const [filter, setFilter] = useState<Filter>('post');

  const handleChangeFilter = (filter: Filter) => {
    setFilter(filter);
  };

  if (!currentProfile) {
    return <div>Loading...</div>;
  }

  return (
    <section className={styles.container}>
      <div className={styles.profileContainer}>
        <div className={styles.wrapper}>
          <div className={styles.innerContainer}>
            <Avatar
              imageUri={currentProfile.imageUri}
              emailOrNickname={currentProfile.nickname ?? currentProfile.email}
              size="large"
            />
            <ProfileMeta user={currentProfile} />
          </div>
          <div className={styles.buttonContainer}>
            {isOwnProfile && (
              <CustomButton label="프로필 편집" onClick={() => {}} />
            )}
            {!isOwnProfile && (
              <CustomButton
                label={
                  myProfile?.following.find(
                    user => user.email === currentProfile.email
                  )
                    ? 'Unfollow'
                    : 'Follow'
                }
                onClick={() => {}}
              />
            )}
          </div>
        </div>
      </div>
      <div className={styles.postContainer}>
        <FilterMenu filter={filter} handleChangeFilter={handleChangeFilter} />
      </div>
    </section>
  );
}

export default UserDetailPage;
