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
      <div className={styles.imageWrapper}>
        {images.length > 0 ? (
          <img
            src={images[0].uri}
            alt={`${title}-feed`}
            className={styles.image}
          />
        ) : (
          <div className={styles.noImage}>No Image Available</div>
        )}
      </div>
      <div className={styles.infoTextContainer}>
        <h3 className={styles.titleText}>{title}</h3>
        <div className={styles.metaContainer}>
          <p className={styles.scoreText}>{`Score ${score}`}</p>
          <MarkerIcon size={24} color={color} />
        </div>
        <p className={styles.descriptionText}>{description}</p>
      </div>
    </div>
  );
}

export default FeedCard;
