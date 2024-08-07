import useAuth from '../../../hooks/queries/useAuth';
import useGetAllPostsByUserId from '../../../hooks/queries/useGetAllPostsByUserId';

import styles from './FeedHomePage.module.css';
import FeedCard from '../../../components/feed/FeedCard/FeedCard';

function FeedHomePage() {
  const { getProfileQuery } = useAuth();
  const { id: userId } = getProfileQuery.data! || {};

  const { data: feeds, isLoading, error } = useGetAllPostsByUserId(userId);

  if (isLoading) {
    return <p>로딩중...</p>;
  }

  if (!isLoading && error) {
    return <p>에러...</p>;
  }

  if (!isLoading && !error && feeds && feeds.length === 0) {
    return <p>피드가 없습니다.</p>;
  }

  console.log(feeds);
  return (
    <section className={styles.container}>
      <ul className={styles.feedContainer}>
        {feeds &&
          feeds.map((feed, index) => (
            <li key={feed.id}>
              <FeedCard feed={feed} />
            </li>
          ))}
      </ul>
    </section>
  );
}

export default FeedHomePage;
