import useForm from '../../../hooks/useForm';
import useGetAddress from '../../../hooks/useGetAddress';
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
  const { selectedLocation } = useLocationStore();

  const address = useGetAddress(selectedLocation!);

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
          value={address ?? '주소를 불러오지 못했습니다.'}
          ellipsis={true}
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
