import { MouseEvent } from 'react';
import CustomButton from '../../../components/common/CustomButton/CustomButton';
import InputField from '../../../components/common/InputField/InputField';
import useForm from '../../../hooks/useForm';
import { validateSignup } from '../../../utils/validate';
import styles from './SignupPage.module.css';
import { postSignup } from '../../../apis/auth';

function SignupPage() {
  const { values, touched, errors, getInputProps } = useForm({
    initialValue: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate: validateSignup,
  });

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const response = await postSignup({
        email: values.email,
        password: values.password,
      });
      console.log('User signed up:', response);
      // 회원가입 후 반환된 사용자 정보를 활용한 추가 로직
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <section className={styles.container}>
      <h1 className={styles.titleText}>회원가입</h1>
      <form className={styles.formContainer}>
        <InputField
          type="text"
          placeholder="이메일"
          touched={touched.email}
          error={errors.email}
          {...getInputProps('email')}
        />
        <InputField
          type="password"
          placeholder="비밀번호"
          touched={touched.password}
          error={errors.password}
          {...getInputProps('password')}
        />
        <InputField
          type="password"
          placeholder="비밀번호 확인"
          touched={touched.confirmPassword}
          error={errors.confirmPassword}
          {...getInputProps('confirmPassword')}
        />
        <CustomButton
          label="회원가입"
          size="large"
          variant="filled"
          onClick={e => handleSubmit(e)}
        />
      </form>
    </section>
  );
}

export default SignupPage;
