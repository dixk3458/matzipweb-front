import Avatar from '../../common/Avatar/Avatar';
import CustomButton from '../../common/CustomButton/CustomButton';
import ProfileMeta from '../ProfileMeta/ProfileMeta';
import styles from './ProfileHeader.module.css';
import { DetailUser } from '../../../types';

interface ProfileHeaderProps {
  currentProfile: DetailUser;
  isOwnProfile: boolean;
}

function ProfileHeader({ currentProfile, isOwnProfile }: ProfileHeaderProps) {
  return (
    <div className={styles.profileHeader}>
      <Avatar
        imageUri={currentProfile.imageUri}
        emailOrNickname={currentProfile.nickname ?? currentProfile.email}
        size="large"
      />
      <div className={styles.innerContainer}>
        <ProfileMeta user={currentProfile} />
        <div className={styles.buttonContainer}>
          {isOwnProfile ? (
            <CustomButton label="프로필 편집" onClick={() => {}} />
          ) : (
            <CustomButton label={''} onClick={() => {}} />
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
