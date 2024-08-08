import { useState } from 'react';
import styles from './ActionBar.module.css';
import HeartFillIcon from '../../icon/HeartFillIcon';
import HeartIcon from '../../icon/HeartIcon';
import BookmarkFillIcon from '../../icon/BookmarkFillIcon';
import BookmarkIcon from '../../icon/BookmarkIcon';

function ActionBar() {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  return (
    <div className={styles.actionButtonsContainer}>
      <button className={styles.actionButton} onClick={() => setIsLiked(!isLiked)}>
        {isLiked ? <HeartFillIcon /> : <HeartIcon />}
      </button>
      <button className={styles.actionButton} onClick={() => setIsBookmarked(!isBookmarked)}>
        {isBookmarked ? <BookmarkFillIcon /> : <BookmarkIcon />}
      </button>
    </div>
  );
}

export default ActionBar;
