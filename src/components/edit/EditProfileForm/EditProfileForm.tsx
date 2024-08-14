import useForm from '../../../hooks/useForm';
import { ProfileUser } from '../../../types';
import Avatar from '../../common/Avatar/Avatar';
import CustomButton from '../../common/CustomButton/CustomButton';
import InputField from '../../common/InputField/InputField';

import styles from './EditProfileForm.module.css';

interface EditProfileFormProps {
  user: ProfileUser;
}

function EditProfileForm({ user }: EditProfileFormProps) {
  const { email, imageUri, nickname } = user;
  const { getInputProps } = useForm({
    initialValue: {
      imageUri: imageUri,
      email: email,
      nickname: nickname,
    },
  });

  return (
    <form className={styles.container}>
      <label htmlFor="image" className={styles.profile}>
        <Avatar
          imageUri={imageUri}
          emailOrNickname={nickname ?? email ?? ''}
          size="large"
        />
      </label>
      <input
        id="image"
        type="file"
        accept="image/*"
        className={styles.inputFile}
      />
      <InputField type="text" disabled={true} value={email ?? ''} />
      <InputField
        type="text"
        placeholder="닉네임을 입력해주세요."
        value={getInputProps('nickname').value ?? ''}
        onChange={getInputProps('nickname').onChange}
      />
      <CustomButton onClick={() => {}} label="업데이트" size="large" />
    </form>
  );
}

export default EditProfileForm;
