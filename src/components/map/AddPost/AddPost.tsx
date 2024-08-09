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

interface AddPostProps {
  onClose: () => void;
}

function AddPost({ onClose }: AddPostProps) {
  const { setSelectedLocation } = useLocationStore();

  const uploadImages = useMutateUploadImages();

  const createPost = useMutateCreatePost();

  const { selectedLocation } = useLocationStore();
  const address = useGetAddress(selectedLocation!);
  const { values, touched, errors, getInputProps } = useForm({
    initialValue: {
      title: '',
      description: '',
    },
    validate: validateAddPost,
  });

  const [selectedImageFiles, setselectedImageFiles] = useState<File[]>([]);
  const [selectedMarkerColor, setSelectedMarkerColor] = useState<MarkerColor>(
    markerColor.RED
  );
  const [selectedScore, setSelctedScore] = useState<number>(
    numbers.DEFAULT_SCORE
  );

  const handleChangeImageFile = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);

    if (files.length + selectedImageFiles.length > 5) {
      alert(messages.EXCEEDED_FILE_COUNT);
      return;
    }

    setselectedImageFiles([...selectedImageFiles, ...files]);
  };

  const handleRemoveImage = (uri: string) => {
    const filtered = selectedImageFiles.filter(
      imageFile => URL.createObjectURL(imageFile) !== uri
    );

    return filtered;
  };

  const handleUpdateMarkerColor = (color: MarkerColor) => {
    setSelectedMarkerColor(color);
  };

  const handleUpdateScore = (score: number) => {
    setSelctedScore(score);
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

    // 서버에 업로드할 이미지 파일들을 만듬
    const formData = new FormData();
    selectedImageFiles.forEach(imageFile => {
      formData.append('files', imageFile);
    });

    uploadImages.mutate(formData, {
      onSuccess: imageUris => {
        console.log('이미지 업로드 성공');
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
              console.log(error);
            },
          }
        );
      },
      onError: error => {
        console.log('이미지 업로드 실패');
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
