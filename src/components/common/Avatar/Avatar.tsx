import styles from './Avatar.module.css';

interface AvatarProps {
  size?: 'small' | 'medium' | 'large';
  imageUri: string | null;
  emailOrNickname: string;
}

function Avatar({ size = 'medium', imageUri, emailOrNickname }: AvatarProps) {
  return (
    <div className={`${styles.imageContainer} ${styles[size]}`}>
      {imageUri ? (
        <img
          className={styles.image}
          src={imageUri}
          alt={`${emailOrNickname}-profile`}
        />
      ) : (
        <span className={styles.placeholderImage}>{emailOrNickname[0]}</span>
      )}
    </div>
  );
}

export default Avatar;
