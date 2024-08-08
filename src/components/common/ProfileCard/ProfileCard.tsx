import { Profile } from '../../../types';
import Avatar from '../Avatar/Avatar';
import styles from './ProfileCard.module.css';

interface ProfileCardProps {
  user: Profile;
}

function ProfileCard({ user }: ProfileCardProps) {
  const { email, imageUri, nickname } = user;
  const validText = nickname ?? email;
  return (
    <div className={styles.container}>
      <Avatar size="small" imageUri={imageUri} emailOrNickname={validText} />
      <p className={styles.text}>{validText}</p>
    </div>
  );
}

export default ProfileCard;
