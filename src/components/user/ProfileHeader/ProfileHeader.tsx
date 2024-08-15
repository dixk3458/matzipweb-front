import Avatar from '../../common/Avatar/Avatar';
import CustomButton from '../../common/CustomButton/CustomButton';
import ProfileMeta from '../ProfileMeta/ProfileMeta';
import styles from './ProfileHeader.module.css';
import { DetailUser } from '../../../types';
import useGetCheckIfFollowing from '../../../hooks/queries/useGetCheckIfFollowing';
import useMutateFollowUser from '../../../hooks/queries/useMutateFollowUser';
import { useNavigate } from 'react-router-dom';

interface ProfileHeaderProps {
  currentProfile: DetailUser;
  isOwnProfile: boolean;
}

function ProfileHeader({ currentProfile, isOwnProfile }: ProfileHeaderProps) {
  const navigation = useNavigate();

  const { data } = useGetCheckIfFollowing(currentProfile.id);
  const isFollowing = data?.isFollowing ?? false;

  const toggleFollow = useMutateFollowUser(isFollowing);

  const handleClickFollowButton = () => {
    toggleFollow.mutate(currentProfile.id);
  };

  return (
    <div className={styles.profileHeader}>
      <Avatar
        imageUri={currentProfile.imageUri}
        emailOrNickname={currentProfile.nickname ?? currentProfile.email}
        size="large"
      />
      <div className={styles.innerContainer}>
        <p className={styles.nickname}>
          {currentProfile.nickname ?? currentProfile.email}
        </p>
        <ProfileMeta user={currentProfile} />
        <div className={styles.buttonContainer}>
          {isOwnProfile ? (
            <CustomButton
              label="프로필 편집"
              onClick={() => navigation('/edit')}
            />
          ) : (
            <CustomButton
              label={isFollowing ? 'Unfollow' : 'Follow'}
              onClick={handleClickFollowButton}
              disabled={data === undefined} // 데이터가 아직 로딩 중일 때 비활성화
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
