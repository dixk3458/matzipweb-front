import styles from './FeedHomePage.module.css';
import FeedCard from '../../../components/feed/FeedCard/FeedCard';
import { Link } from 'react-router-dom';
import useGetInfinitePosts from '../../../hooks/queries/useGetInfinitePosts';
import { useCallback, useRef } from 'react';
import SuspenseLoading from '../../../components/common/SuspenseLoading/SuspenseLoading';

function FeedHomePage() {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useGetInfinitePosts();

  const observer = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (isFetchingNextPage) {
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
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  );

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
      {isFetchingNextPage && <SuspenseLoading />}
    </section>
  );
}

export default FeedHomePage;
