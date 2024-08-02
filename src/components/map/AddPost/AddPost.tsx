import useForm from '../../../hooks/useForm';
import useLocationStore from '../../../store/useLocationStore';
import { validateAddPost } from '../../../utils';
import CustomButton from '../../common/CustomButton/CustomButton';
import InputField from '../../common/InputField/InputField';
import TextAreaField from '../../common/TextAreaField/TextAreaField';
import MapLocationIcon from '../../icon/MapLocationIcon';
import styles from './AddPost.module.css';

interface AddPostProps {
  onClose: () => void;
}

function AddPost({ onClose }: AddPostProps) {
  // 지도를 클릭하고 add를 하면
  // AddPostModal이 보인다.

  const { selectedLocation } = useLocationStore();

  const { values, touched, errors, getInputProps } = useForm({
    initialValue: {
      title: '',
      description: '',
    },
    validate: validateAddPost,
  });

  const handleSubmit = () => {};

  return (
    <section className={styles.container}>
      <form className={styles.formContainer}>
        <InputField
          disabled={true}
          type="text"
          value={'dd'}
          icon={<MapLocationIcon />}
        />
        <InputField
          type="text"
          placeholder="제목을 입력해 주세요."
          touched={touched.title}
          error={errors.title}
          {...getInputProps('title')}
        />
        <TextAreaField
          error={errors.description}
          touched={touched.description}
          {...getInputProps('description')}
        />
        <CustomButton
          label="POST"
          size="medium"
          variant="filled"
          onClick={() => handleSubmit()}
        />
      </form>
    </section>
  );
}

export default AddPost;
