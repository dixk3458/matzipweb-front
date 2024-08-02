import { MouseEvent, useState } from 'react';
import useForm from '../../../hooks/useForm';
import useGetAddress from '../../../hooks/useGetAddress';
import useLocationStore from '../../../store/useLocationStore';
import { formatDate, validateAddPost } from '../../../utils';
import CustomButton from '../../common/CustomButton/CustomButton';
import InputField from '../../common/InputField/InputField';
import TextAreaField from '../../common/TextAreaField/TextAreaField';
import MapLocationIcon from '../../icon/MapLocationIcon';
import MarkerSelector from '../MarkerSelector/MarkerSelector';
import styles from './AddPost.module.css';
import { MarkerColor } from '../../../types';
import { markerColor } from '../../../constants';
import messages from '../../../constants/messages';

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

  const [selectedMarkerColor, setSelectedMarkerColor] = useState<MarkerColor>(
    markerColor.RED
  );

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const date = new Date();
    const formattedDate = formatDate(date, '.');

    const newValues = {
      address,
      markerColor: selectedMarkerColor,
      date: formattedDate,
      ...values,
    };

    if (
      errors.title ||
      errors.description ||
      Object.values(newValues).some(data => !data)
    ) {
      alert(messages.INVALID_VALUE);
      return;
    }

    console.log(newValues);
    onClose();
  };

  const handleUpdateMarkerColor = (color: MarkerColor) => {
    setSelectedMarkerColor(color);
  };

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
        <MarkerSelector
          selectedMarkerColor={selectedMarkerColor}
          handleUpdateMarkerColor={handleUpdateMarkerColor}
        />
        <CustomButton
          label="POST"
          size="medium"
          variant="filled"
          onClick={e => handleSubmit(e)}
        />
      </form>
    </section>
  );
}

export default AddPost;
