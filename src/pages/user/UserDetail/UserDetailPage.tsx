import { useLocation } from 'react-router-dom';
import styles from './UserDetailPage.module.css';
import useAuth from '../../../hooks/queries/useAuth';
import useGetProfileByEmail from '../../../hooks/queries/useGetProfileByEmail';
import CustomLoadingSpinner from '../../../components/common/CustomLoadingSpinner/CustomLoadingSpinner';
import ProfileHeader from '../../../components/user/ProfileHeader/ProfileHeader';
import FilterMenu, {
  Filter,
} from '../../../components/user/FilterMenu/FilterMenu';
import PostsGrid from '../../../components/user/PostsGrid/PostsGrid';
import { useState } from 'react';

function UserDetailPage() {
  const location = useLocation();
  const { email } = location.state;

  const { getProfileQuery } = useAuth();
  const { email: profileEmail } = getProfileQuery.data ?? {};

  const isOwnProfile = email === profileEmail;

  const {
    data: currentProfile,
    isLoading,
    error,
  } = useGetProfileByEmail(email);

  const [filter, setFilter] = useState<Filter>('post');

  const handleChangeFilter = (filter: Filter) => {
    setFilter(filter);
  };

  return (
    <section className={styles.container}>
      {isLoading && <CustomLoadingSpinner />}
      {!isLoading && error && <p>에러가 발생했습니다.</p>}
      {currentProfile && (
        <>
          <ProfileHeader
            currentProfile={currentProfile}
            isOwnProfile={isOwnProfile}
          />
          <FilterMenu filter={filter} handleChangeFilter={handleChangeFilter} />
          <PostsGrid currentUserId={currentProfile.id} filter={filter} />
        </>
      )}
    </section>
  );
}

export default UserDetailPage;
