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

function ActionBar() {
  const { currentPostId } = useCurrentPostIdStore();

  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const toggleLike = useMutateLikePost(isLiked);
  const toggleBookmark = useMutateBookmarkPost(isBookmarked);

  const handleClickLikeButton = () => {
    toggleLike.mutate(currentPostId!, {
      onSuccess: () => {
        console.log('좋아요 토글 성공');
        setIsLiked(!isLiked); // 성공 시 상태를 토글
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
        {isLiked ? <HeartFillIcon color={colors.RED} /> : <HeartIcon />}
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
