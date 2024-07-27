import { useNavigate } from 'react-router-dom';
import styles from './HomePage.module.css';
import MapLocationIcon from '../../../components/icon/MapLocationIcon';
import CustomButton from '../../../components/common/CustomButton/CustomButton';
import ShareIcon from '../../../components/icon/ShareIcon';
import StoreIcon from '../../../components/icon/StoreIcon';

const features = [
  {
    icon: <MapLocationIcon size={32} />,
    title: '맛집 저장',
    description: '지도에서 맛집을 기록하세요.',
  },
  {
    icon: <ShareIcon size={32} />,
    title: '맛집 공유',
    description: '친구들과 맛집을 공유하세요.',
  },
  {
    icon: <StoreIcon size={32} />,
    title: '리뷰 작성',
    description: '맛집에 대한 리뷰를 남겨보세요.',
  },
];

function HomePage() {
  const navigate = useNavigate();

  return (
    <section className={styles.container}>
      <h1 className={styles.descriptionText}>
        나만의 맛집을 찾아서 저장하고 공유하세요!
      </h1>
      <ul className={styles.featureContainer}>
        {features.map(({ icon, title, description }, index) => (
          <li key={index} className={styles.feature}>
            <div className={styles.featureIcon}>{icon}</div>
            <p className={styles.featureTitle}>{title}</p>
            <p className={styles.featureDescription}>{description}</p>
          </li>
        ))}
      </ul>
      <div className={styles.buttonContainer}>
        <CustomButton
          label="처음 이신가요?"
          size="medium"
          variant="filled"
          onClick={() => navigate('/signup')}
        />
        <CustomButton
          label="이미 계정이 있으신가요?"
          size="medium"
          variant="outlined"
          onClick={() => navigate('/signin')}
        />
      </div>
    </section>
  );
}

export default HomePage;
