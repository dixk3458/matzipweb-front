import { useLocation } from 'react-router-dom';
import styles from './UserDetailPage.module.css';
import useAuth from '../../../hooks/queries/useAuth';
import useGetProfileByEmail from '../../../hooks/queries/useGetProfileByEmail';

function UserDetailPage() {
  // email 비교해 내 홈인지 아닌지 판단
  // email을 이용해서 user에 대한 정보 가져오기
  // 정보로 페이지 구성

  const location = useLocation();
  const { email } = location.state;

  const { getProfileQuery } = useAuth();
  const { email: profileEmail } = getProfileQuery.data ?? {};

  const isOwnProfile = email === profileEmail;

  const { data } = useGetProfileByEmail(email);
  console.log(data);

  return <></>;
}

export default UserDetailPage;
