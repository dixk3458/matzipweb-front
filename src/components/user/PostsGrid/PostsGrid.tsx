import { Link } from 'react-router-dom';
import { Filter } from '../FilterMenu/FilterMenu';

import styles from './PostsGrid.module.css';
import { useCallback, useRef } from 'react';
import useGetInfinitePostsByUserIdWithFilter from '../../../hooks/queries/useGetInfinitePostsByUserIdWithFilter';
import SuspenseLoading from '../../common/SuspenseLoading/SuspenseLoading';

interface PostsGridProps {
  currentUserId: number;
  filter: Filter;
}

function PostsGrid({ currentUserId, filter }: PostsGridProps) {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useGetInfinitePostsByUserIdWithFilter(currentUserId, filter);

  const observer = useRef<IntersectionObserver | null>(null);

  const lastPostElementRef = useCallback(
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

  const posts = data?.pages.flat() || [];

  return (
    <>
      <ul className={styles.container}>
        {posts.map((post, index) => (
          <li
            key={post.id}
            className={styles.item}
            ref={index === posts.length - 1 ? lastPostElementRef : null}
          >
            <Link
              to={`/feed/${post.id}`}
              state={{ feedId: post.id }}
              className={styles.link}
            >
              {post.images.length > 0 ? (
                <img
                  src={post.images[0].uri}
                  alt={post.title}
                  className={styles.image}
                />
              ) : (
                <span className={styles.noImage}>No Image Available</span>
              )}
              <div className={styles.infoContainer}>
                <p className={styles.titleText}>{post.title}</p>
                <p className={styles.descriptionText}>{post.description}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      {isFetchingNextPage && <SuspenseLoading />}
    </>
  );
}

export default PostsGrid;
