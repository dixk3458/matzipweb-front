import { ChangeEvent, MouseEvent, useState } from 'react';
import useForm from '../../../hooks/useForm';
import useGetAddress from '../../../hooks/useGetAddress';
import useLocationStore from '../../../store/useLocationStore';
import { validateAddPost } from '../../../utils';
import CustomButton from '../../common/CustomButton/CustomButton';
import InputField from '../../common/InputField/InputField';
import TextAreaField from '../../common/TextAreaField/TextAreaField';
import MapLocationIcon from '../../icon/MapLocationIcon';
import MarkerSelector from '../MarkerSelector/MarkerSelector';
import { MarkerColor } from '../../../types';
import { markerColor, numbers } from '../../../constants';
import messages from '../../../constants/messages';
import ScoreSelector from '../ScoreSelector/ScoreSelector';

import styles from './AddPost.module.css';
import ImageSelector from '../ImageSelector/ImageSelector';
import useMutateCreatePost from '../../../hooks/queries/useMutateCreatePost';
import useMutateUploadImages from '../../../hooks/queries/useMutateUploadImages';
import useAuth from '../../../hooks/queries/useAuth';

interface AddPostProps {
  onClose: () => void;
}

function AddPost({ onClose }: AddPostProps) {
  const { getProfileQuery } = useAuth();
  const { id: userId } = getProfileQuery.data ?? {};
  const { setSelectedLocation, selectedLocation } = useLocationStore();
  const uploadImages = useMutateUploadImages();
  const createPost = useMutateCreatePost(userId!);
  const address = useGetAddress(selectedLocation!);
  const { values, touched, errors, getInputProps } = useForm({
    initialValue: {
      title: '',
      description: '',
    },
    validate: validateAddPost,
  });

  const [selectedImageFiles, setSelectedImageFiles] = useState<File[]>([]);
  const [selectedMarkerColor, setSelectedMarkerColor] = useState<MarkerColor>(
    markerColor.RED
  );
  const [selectedScore, setSelectedScore] = useState<number>(
    numbers.DEFAULT_SCORE
  );

  const handleChangeImageFile = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);

    if (files.length + selectedImageFiles.length > 5) {
      alert(messages.EXCEEDED_FILE_COUNT);
      return;
    }

    setSelectedImageFiles([...selectedImageFiles, ...files]);
  };

  const handleRemoveImage = (fileToRemove: File) => {
    setSelectedImageFiles(prevFiles =>
      prevFiles.filter(file => file !== fileToRemove)
    );
  };

  const handleUpdateMarkerColor = (color: MarkerColor) => {
    setSelectedMarkerColor(color);
  };

  const handleUpdateScore = (score: number) => {
    setSelectedScore(score);
  };

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const location = {
      latitude: selectedLocation!.lat,
      longitude: selectedLocation!.lng,
    };

    const body = {
      ...values,
      address: address,
      color: selectedMarkerColor,
      score: selectedScore,
    };

    if (
      errors.title ||
      errors.description ||
      !location.latitude ||
      !location.longitude ||
      Object.values(body).some(data => !data)
    ) {
      alert(messages.INVALID_VALUE);
      return;
    }

    // 서버에 업로드할 이미지 파일들을 FormData에 추가
    const formData = new FormData();
    selectedImageFiles.forEach(imageFile => {
      formData.append('files', imageFile);
    });

    uploadImages.mutate(formData, {
      onSuccess: imageUris => {
        createPost.mutate(
          {
            ...body,
            ...location,
            imageUris,
          },
          {
            onSuccess: () => {
              setSelectedLocation(null);
              onClose();
            },
            onError: error => {
              console.error(error);
            },
          }
        );
      },
      onError: error => {
        console.error('이미지 업로드 실패:', error);
      },
    });
  };

  return (
    <section className={styles.container}>
      <form className={styles.formContainer}>
        <InputField
          disabled={true}
          type="text"
          value={address ?? '주소를 불러오지 못했습니다.'}
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
          selectedImageFiles={selectedImageFiles}
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
