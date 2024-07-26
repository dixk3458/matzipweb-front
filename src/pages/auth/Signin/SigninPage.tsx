import { MouseEvent } from 'react';
import InputField from '../../../components/common/InputField/InputField';
import CustomButton from '../../../components/common/CustomButton/CustomButton';
import styles from './SigninPage.module.css';
import useForm from '../../../hooks/useForm';
import { validateSignin } from '../../../utils/validate';

function SigninPage() {
  // useForm() 커스텀 훅
  const { values, errors, touched, getInputProps } = useForm({
    initialValue: {
      email: '',
      password: '',
    },
    validate: validateSignin,
  });

  console.log(errors);

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(values);
  };

  return (
    <section className={styles.container}>
      <h1 className={styles.titleText}>로그인</h1>
      <form className={styles.formContainer}>
        <InputField
          type="text"
          placeholder="이메일"
          touched={touched.email}
          error={errors.email}
          {...getInputProps('email')}
          // value={values.email}
          // onChange={e => handleChangeValue('email', e)}
          // onBlur={() => handleChangeTouched('email')}
        />
        <InputField
          type="password"
          placeholder="비밀번호"
          touched={touched.password}
          error={errors.password}
          {...getInputProps('password')}
        />
        <CustomButton
          label="로그인"
          variant="filled"
          size="large"
          onClick={e => handleSubmit(e)}
        />
      </form>
    </section>
  );
}

export default SigninPage;
