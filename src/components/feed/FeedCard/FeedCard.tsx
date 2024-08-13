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
      {images.length > 0 ? (
        <img
          src={images[0].uri}
          alt={`${title}-feed`}
          className={styles.image}
        />
      ) : (
        <div className={styles.noImage}>No Image Available</div>
      )}
      <div className={styles.content}>
        <h3 className={styles.titleText}>{title}</h3>
        <p className={styles.descriptionText}>{description}</p>
        <div className={styles.meta}>
          <span className={styles.score}>{`Score ${score}`}</span>
          <MarkerIcon size={20} color={color} />
        </div>
      </div>
    </div>
  );
}

export default FeedCard;
