import { Post } from '../../../types';
import MarkerIcon from '../../icon/MarkerIcon';

import styles from './FeedCard.module.css';

interface FeedCardProps {
  feed: Post;
}

function FeedCard({ feed }: FeedCardProps) {
  const { title, description, images, score, color } = feed;
  return (
    <div className={styles.container}>
      <img src={images[0].uri} alt={`${title}-feed`} />
      <div className={styles.infoTextContainer}>
        <p className={styles.titleText}>{title}</p>
        <div className={styles.metaContainer}>
          <p className={styles.scoreText}>{`Score ${score}`}</p>
          <MarkerIcon size={24} color={color} />
        </div>
      </div>
      <div className={styles.descriptionContainer}>
        <p className={styles.descriptionText}>{description}</p>
      </div>
    </div>
  );
}

export default FeedCard;
