import { useLocation } from 'react-router-dom';
import styles from './FeedDetail.module.css';
import useGetPostByPostId from '../../../hooks/queries/useGetPostByPostId';

function FeedDetailPage() {
  const location = useLocation();
  const { feedId } = location.state || {};

  const { data: feed, isLoading, error } = useGetPostByPostId(feedId);

  if (isLoading) {
    return <p>로딩중...</p>;
  }

  if (!isLoading && error) {
    return <p>에러...</p>;
  }

  return <section className={styles.container}></section>;
}

export default FeedDetailPage;
