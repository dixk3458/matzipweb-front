import { ChangeEvent, MouseEvent, useState } from 'react';
import useMutateEditProfile from '../../../hooks/queries/useMutateEditProfile';
import useForm from '../../../hooks/useForm';
import { ProfileUser } from '../../../types';
import Avatar from '../../common/Avatar/Avatar';
import CustomButton from '../../common/CustomButton/CustomButton';
import InputField from '../../common/InputField/InputField';

import styles from './EditProfileForm.module.css';
import messages from '../../../constants/messages';
import useMutateUploadImages from '../../../hooks/queries/useMutateUploadImages';
import { useNavigate } from 'react-router-dom';

interface EditProfileFormProps {
  user: ProfileUser;
}

function EditProfileForm({ user }: EditProfileFormProps) {
  const navigation = useNavigate();

  const { email, imageUri, nickname } = user;
  const { values, getInputProps } = useForm({
    initialValue: {
      email: email,
      nickname: nickname,
    },
  });

  const uploadImages = useMutateUploadImages();

  const [selectedImageFile, setSelectedImageFile] = useState<File | null>();
  const [selectedImageUri, setSelectedImageUri] = useState(imageUri);

  const editProfile = useMutateEditProfile();

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ?? [];

    if (files.length > 1) {
      alert(messages.EXCEEDED_FILE_COUNT);
      return;
    }

    const file = files[0];

    setSelectedImageFile(file);

    setSelectedImageUri(URL.createObjectURL(file));
  };

  const handleClickUpdateButton = (e: MouseEvent) => {
    e.preventDefault();

    if (selectedImageFile) {
      // 이미지가 선택된 경우 업로드 로직 실행
      const formData = new FormData();
      formData.append('files', selectedImageFile);

      uploadImages.mutate(formData, {
        onSuccess: imageUris => {
          const imageUri = imageUris[0];
          editProfile.mutate(
            { imageUri: imageUri.uri, ...values },
            {
              onSuccess: () => {
                navigation(`/user/${email}`, { state: { email } });
              },
            }
          );
        },
        onError: error => {
          console.log(error);
        },
      });
    } else {
      editProfile.mutate(
        { imageUri: selectedImageUri, ...values },
        {
          onSuccess: () => {
            navigation(`/user/${email}`, { state: { email } });
          },
        }
      );
    }
  };

  const handleClickDefaultImageButton = (e: MouseEvent) => {
    e.preventDefault();
    setSelectedImageUri(null);
    setSelectedImageFile(null);
  };

  return (
    <form className={styles.container}>
      <label htmlFor="image" className={styles.profile}>
        <Avatar
          imageUri={selectedImageUri}
          emailOrNickname={nickname ?? email ?? ''}
          size="large"
        />
        <div className={styles.defaultImageButton}>
          <CustomButton
            label="기본 프로필 사용"
            onClick={e => handleClickDefaultImageButton(e)}
            size="small"
            variant="outlined"
          />
        </div>
      </label>
      <input
        id="image"
        type="file"
        accept="image/*"
        className={styles.inputFile}
        onChange={e => handleChangeImage(e)}
      />
      <InputField type="text" disabled={true} value={email ?? ''} />
      <InputField
        type="text"
        placeholder="닉네임을 입력해주세요."
        value={getInputProps('nickname').value ?? ''}
        onChange={getInputProps('nickname').onChange}
      />
      <CustomButton
        onClick={e => handleClickUpdateButton(e)}
        label="업데이트"
        size="large"
      />
    </form>
  );
}

export default EditProfileForm;
