import useAuth from '../../../hooks/queries/useAuth';
import styles from './FeedHomePage.module.css';
import FeedCard from '../../../components/feed/FeedCard/FeedCard';
import { Link } from 'react-router-dom';
import CustomLoadingSpinner from '../../../components/common/CustomLoadingSpinner/CustomLoadingSpinner';
import useGetInfinitePostsByUserIdWithFilter from '../../../hooks/queries/useGetInfinitePostsByUserIdWithFilter';

function FeedHomePage() {
  const { getProfileQuery } = useAuth();
  const { id: userId } = getProfileQuery.data || {};

  const {
    data: feeds,
    isLoading,
    error,
  } = useGetInfinitePostsByUserIdWithFilter('post', {
    userId: userId!,
    page: 1,
  });

  return (
    <section className={`${styles.container} ${isLoading && styles.loading}`}>
      {/* {isLoading && <CustomLoadingSpinner />}

      {!isLoading && error && <p>에러가 발생했습니다. 다시 시도해주세요.</p>}

      {!isLoading && !error && feeds && feeds.length === 0 && (
        <p>피드가 없습니다.</p>
      )}

      {!isLoading && !error && feeds && feeds.length > 0 && (
        <ul className={styles.feedContainer}>
          {feeds.map(feed => (
            <li key={feed.id} className={styles.item}>
              <Link
                to={`/feed/${feed.id}`}
                state={{ feedId: feed.id }}
                className={styles.link}
              >
                <FeedCard feed={feed} />
              </Link>
            </li>
          ))}
        </ul>
      )} */}
    </section>
  );
}

export default FeedHomePage;
