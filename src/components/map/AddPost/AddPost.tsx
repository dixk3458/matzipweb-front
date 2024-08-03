import { ChangeEvent, MouseEvent, useState } from 'react';
import useForm from '../../../hooks/useForm';
import useGetAddress from '../../../hooks/useGetAddress';
import useLocationStore from '../../../store/useLocationStore';
import { formatDate, validateAddPost } from '../../../utils';
import CustomButton from '../../common/CustomButton/CustomButton';
import InputField from '../../common/InputField/InputField';
import TextAreaField from '../../common/TextAreaField/TextAreaField';
import MapLocationIcon from '../../icon/MapLocationIcon';
import MarkerSelector from '../MarkerSelector/MarkerSelector';
import { ImageUri, MarkerColor } from '../../../types';
import { markerColor, numbers } from '../../../constants';
import messages from '../../../constants/messages';
import ScoreSelector from '../ScoreSelector/ScoreSelector';
import XIcon from '../../icon/XIcon';
import PlusIcon from '../../icon/PlusIcon';

import styles from './AddPost.module.css';
import ImageSelector from '../ImageSelector/ImageSelector';

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

  const [selectedImageUris, setSelectedImageUris] = useState<ImageUri[]>([]);
  const [selectedMarkerColor, setSelectedMarkerColor] = useState<MarkerColor>(
    markerColor.RED
  );
  const [selectedScore, setSelctedScore] = useState<number>(
    numbers.DEFAULT_SCORE
  );

  const handleChangeImageFile = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []).map(file => ({
      uri: URL.createObjectURL(file),
    })); // input으로 등록된 이미지 Uri 배열 생성

    if (files.length + selectedImageUris.length > 5) {
      alert(messages.EXCEEDED_FILE_COUNT);
      return;
    }

    setSelectedImageUris([...selectedImageUris, ...files]);
  };

  const handleRemoveImage = (uri: string) => {
    setSelectedImageUris(selectedImageUris.filter(image => image.uri !== uri));
  };

  const handleUpdateMarkerColor = (color: MarkerColor) => {
    setSelectedMarkerColor(color);
  };

  const handleUpdateScore = (score: number) => {
    setSelctedScore(score);
  };

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const date = new Date();
    const formattedDate = formatDate(date, '.');

    const newValues = {
      address,
      markerColor: selectedMarkerColor,
      score: selectedScore,
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
        <ImageSelector
          selectedImageUris={selectedImageUris}
          handleRemoveImage={handleRemoveImage}
          handleChangeImageFile={handleChangeImageFile}
        />
        <MarkerSelector
          selectedMarkerColor={selectedMarkerColor}
          handleUpdateMarkerColor={handleUpdateMarkerColor}
        />
        <ScoreSelector
          selectedScore={selectedScore}
          handleUpdateScore={handleUpdateScore}
        />
        <CustomButton
          label="POST"
          size="medium"
          variant="filled"
          onClick={handleSubmit}
        />
      </form>
    </section>
  );
}

export default AddPost;
