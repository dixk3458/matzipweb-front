import { useLocation } from 'react-router-dom';
import useAuth from '../../../hooks/queries/useAuth';
import useGetProfileByEmail from '../../../hooks/queries/useGetProfileByEmail';
import ProfileHeader from '../../../components/user/ProfileHeader/ProfileHeader';
import FilterMenu, {
  Filter,
} from '../../../components/user/FilterMenu/FilterMenu';
import PostsGrid from '../../../components/user/PostsGrid/PostsGrid';
import { Suspense, useState } from 'react';

import styles from './UserDetailPage.module.css';
import SuspenseLoading from '../../../components/common/SuspenseLoading/SuspenseLoading';

function UserDetailPage() {
  const location = useLocation();
  const { email } = location.state;

  const { getProfileQuery } = useAuth();
  const { email: profileEmail } = getProfileQuery.data ?? {};

  const isOwnProfile = email === profileEmail;

  const { data: currentProfile } = useGetProfileByEmail(email);

  const [filter, setFilter] = useState<Filter>('post');

  const handleChangeFilter = (filter: Filter) => {
    setFilter(filter);
  };

  return (
    <section className={styles.container}>
      {currentProfile && (
        <>
          <ProfileHeader
            currentProfile={currentProfile}
            isOwnProfile={isOwnProfile}
          />
          <FilterMenu filter={filter} handleChangeFilter={handleChangeFilter} />
          <Suspense fallback={<SuspenseLoading />}>
            <PostsGrid currentUserId={currentProfile.id} filter={filter} />
          </Suspense>
        </>
      )}
    </section>
  );
}

export default UserDetailPage;
