import { Post } from '../../../types';
import MarkerIcon from '../../icon/MarkerIcon';
import styles from './FeedCard.module.css';

interface FeedCardProps {
  feed: Post;
}

function FeedCard({ feed }: FeedCardProps) {
  const { title, description, images, score, color, author } = feed;
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
        <div className={styles.titleAndAuthor}>
          <p className={styles.titleText}>{title}</p>
          <p className={styles.author}>by {author.nickname ?? author.email}</p>
        </div>
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
