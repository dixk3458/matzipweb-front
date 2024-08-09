import { useState } from 'react';
import styles from './ActionBar.module.css';
import HeartFillIcon from '../../icon/HeartFillIcon';
import HeartIcon from '../../icon/HeartIcon';
import BookmarkFillIcon from '../../icon/BookmarkFillIcon';
import BookmarkIcon from '../../icon/BookmarkIcon';
import useMutateLikePost from '../../../hooks/queries/useMutateLikePost';
import useCurrentPostIdStore from '../../../store/useCurrentPostIdStore';
import { colors } from '../../../constants';
import useMutateBookmarkPost from '../../../hooks/queries/useMutateBookmarkPost';
import useGetLikeByPostId from '../../../hooks/queries/useGetLikeByPostId';

function ActionBar() {
  const { currentPostId } = useCurrentPostIdStore();
  const {
    data: liked = false,
    isLoading,
    error,
  } = useGetLikeByPostId(currentPostId!);

  const [isBookmarked, setIsBookmarked] = useState(false);

  const toggleLike = useMutateLikePost(liked);
  const toggleBookmark = useMutateBookmarkPost(isBookmarked);

  const handleClickLikeButton = () => {
    toggleLike.mutate(currentPostId!, {
      onSuccess: () => {
        console.log('좋아요 토글 성공');
      },
      onError: error => {
        console.error('좋아요 요청 실패:', error);
        alert(error.response?.data.message);
      },
    });
  };

  const handleClickBookmarkButton = () => {
    toggleBookmark.mutate(currentPostId!, {
      onSuccess: () => {
        console.log('북마크 토글 성공');
        setIsBookmarked(prev => !prev);
      },
      onError: error => {
        console.log('북마크 토글 실패', error);
        alert(error.response?.data.message);
      },
    });
  };

  return (
    <div className={styles.actionButtonsContainer}>
      <button
        className={styles.actionButton}
        onClick={() => handleClickLikeButton()}
      >
        {liked ? <HeartFillIcon color={colors.RED} /> : <HeartIcon />}
      </button>
      <button
        className={styles.actionButton}
        onClick={() => handleClickBookmarkButton()}
      >
        {isBookmarked ? <BookmarkFillIcon /> : <BookmarkIcon />}
      </button>
    </div>
  );
}

export default ActionBar;
