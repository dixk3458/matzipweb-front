import { useLocation } from 'react-router-dom';
import useGetPostByPostId from '../../../hooks/queries/useGetPostByPostId';
import messages from '../../../constants/messages';
import { useEffect, useState } from 'react';
import { ImageUri } from '../../../types';
import { formatDate } from '../../../utils';
import AddCommentForm from '../../../components/feed/AddCommentForm/AddCommentForm';
import ActionBar from '../../../components/feed/ActionBar/ActionBar';
import MarkerIcon from '../../../components/icon/MarkerIcon';
import styles from './FeedDetail.module.css';

function FeedDetailPage() {
  const location = useLocation();
  const { feedId } = location.state || {};

  const { data: feed, isLoading, error } = useGetPostByPostId(feedId);

  const [selectedImage, setSelectedImage] = useState<ImageUri>();

  useEffect(() => {
    if (feed) {
      setSelectedImage(feed.images[0]);
    }
  }, [feed]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error occurred</p>;
  }

  if (!feed) {
    return <p>{messages.INVALID_VALUE}</p>;
  }

  const {
    images,
    title,
    description,
    createdDate,
    score,
    color,
    address,
    author,
  } = feed;

  return (
    <section className={styles.container}>
      <div className={styles.leftSection}>
        <div className={styles.imageWrapper}>
          {selectedImage ? (
            <img
              src={selectedImage.uri}
              alt={title}
              className={styles.mainImage}
            />
          ) : (
            <p className={styles.noImageText}>No image available</p>
          )}
        </div>
        <ul className={styles.thumbnailList}>
          {images.map(image => (
            <li key={image.id} className={styles.thumbnailWrapper}>
              <img
                src={image.uri}
                alt={title}
                className={styles.thumbnail}
                onClick={() => setSelectedImage(image)}
              />
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.rightSection}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.metaInfo}>
          <p className={styles.date}>{formatDate(createdDate, '-')}</p>
          <p className={styles.author}>By {author.nickname || author.email}</p>
        </div>
        <p className={styles.address}>{address}</p>
        <textarea disabled className={styles.description} value={description} />
        <div className={styles.scoreContainer}>
          <span>Score: {score}</span>
          <MarkerIcon color={color} size={24} />
        </div>
        <ActionBar />
        <div className={styles.commentsSection}>
          <h2>Comments</h2>
          <ul className={styles.commentList}></ul>
        </div>
        <AddCommentForm />
      </div>
    </section>
  );
}

export default FeedDetailPage;
