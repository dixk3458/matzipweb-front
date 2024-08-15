import { useLocation, useNavigate } from 'react-router-dom';
import useGetPostByPostId from '../../../hooks/queries/useGetPostByPostId';
import messages from '../../../constants/messages';
import { useEffect, useState } from 'react';
import { ImageUri } from '../../../types';
import { formatDate } from '../../../utils';
import ActionBar from '../../../components/feed/ActionBar/ActionBar';
import MarkerIcon from '../../../components/icon/MarkerIcon';
import CommentList from '../../../components/feed/CommentList/CommentList';

import styles from './FeedDetail.module.css';
import useCurrentPostIdStore from '../../../store/useCurrentPostIdStore';
import useAuth from '../../../hooks/queries/useAuth';
import TrashIcon from '../../../components/icon/TrashIcon';
import useMutateDeletePost from '../../../hooks/queries/useMutateDeletePost';

function FeedDetailPage() {
  const navigation = useNavigate();

  const { setCurrentPostId } = useCurrentPostIdStore();

  const location = useLocation();
  const { feedId } = location.state || {};

  const { getProfileQuery } = useAuth();
  const { id: loginUserId } = getProfileQuery.data ?? {};

  const { data: feed, isLoading, error } = useGetPostByPostId(feedId);

  const deletePost = useMutateDeletePost();

  const [selectedImage, setSelectedImage] = useState<ImageUri>();

  // 컴포넌트가 마운트되면 feedId를 상태로 설정
  useEffect(() => {
    setCurrentPostId(feedId);
  }, [feedId, setCurrentPostId]);

  useEffect(() => {
    if (feed) {
      setSelectedImage(feed.images[0]);
    }
  }, [feed]);

  const handleClickDeleteButton = () => {
    if (!feed) {
      return;
    }
    if (window.confirm(messages.CONFIRM_DELETE)) {
      deletePost.mutate(feed.id, {
        onSuccess: () => {
          navigation('/map');
        },
      });
    } else {
      return;
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error occurred</p>;
  }

  if (!feed) {
    return <p>{messages.INVALID_VALUE}</p>;
  }

  const isOwnFeed = loginUserId === feed.author.id;

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

  const emptySlots = Array(5 - images.length).fill(null);

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
          {emptySlots.map((_, index) => (
            <li key={`empty-${index}`} className={styles.thumbnailWrapper}>
              <div className={styles.emptyThumbnail}>No Image</div>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.rightSection}>
        {isOwnFeed && (
          <button
            className={styles.deleteButton}
            onClick={() => handleClickDeleteButton()}
          >
            <TrashIcon />
          </button>
        )}
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
        <CommentList />
      </div>
    </section>
  );
}

export default FeedDetailPage;
