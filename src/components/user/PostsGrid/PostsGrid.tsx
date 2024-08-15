import { Link } from 'react-router-dom';
import useGetPostsByUserIdWithFilter from '../../../hooks/queries/useGetPostsByUserIdWithFilter';
import { Filter } from '../FilterMenu/FilterMenu';

import styles from './PostsGrid.module.css';

interface PostsGridProps {
  currentUserId: number;
  filter: Filter;
}

function PostsGrid({ currentUserId, filter }: PostsGridProps) {
  const {
    data: filteredPosts,
    isLoading,
    error,
  } = useGetPostsByUserIdWithFilter(currentUserId, filter);

  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return (
      <div className={styles.error}>
        An error occurred. Please try again later.
      </div>
    );
  }

  if (!filteredPosts || filteredPosts.length === 0) {
    return <div className={styles.noPosts}>No posts found.</div>;
  }

  return (
    <ul className={styles.container}>
      {filteredPosts.map(post => (
        <li key={post.id} className={styles.item}>
          <Link to={`/feed/${post.id}`} state={{ feedId: post.id }} className={styles.link}>
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
  );
}

export default PostsGrid;
