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
      console.log('Response');
      console.log(response);
      alert('회원가입 성공');
    } catch (error) {
      console.log(error);
      alert('실패');
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
