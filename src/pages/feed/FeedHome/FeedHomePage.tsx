import styles from './FeedHomePage.module.css';
import FeedCard from '../../../components/feed/FeedCard/FeedCard';
import { Link } from 'react-router-dom';
import CustomLoadingSpinner from '../../../components/common/CustomLoadingSpinner/CustomLoadingSpinner';
import useGetInfinitePosts from '../../../hooks/queries/useGetInfinitePosts';
import { useCallback, useRef } from 'react';

function FeedHomePage() {
  const {
    data,
    isLoading,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetInfinitePosts();

  const observer = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (isLoading || isFetchingNextPage) {
        return;
      }

      if (observer.current) {
        observer.current.disconnect();
        return;
      }

      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (node) {
        observer.current.observe(node);
      }
    },
    [isLoading, isFetchingNextPage, fetchNextPage, hasNextPage]
  );

  if (isLoading) {
    return (
      <div className={styles.container}>
        <CustomLoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <div className={styles.container}>error</div>;
  }

  const feeds = data?.pages.flat() || [];

  return (
    <section className={`${styles.container}`}>
      <ul className={styles.feedContainer}>
        {feeds.map((feed, index) => (
          <li
            key={feed.id}
            className={styles.item}
            ref={index === feeds.length - 1 ? lastElementRef : null}
          >
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
    </section>
  );
}

export default FeedHomePage;
