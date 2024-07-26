import { ChangeEvent, MouseEvent, useState } from 'react';
import InputField from '../../../components/common/InputField/InputField';
import CustomButton from '../../../components/common/CustomButton/CustomButton';
import styles from './SigninPage.module.css';

function SigninPage() {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  const handleChangeValue = (
    name: string,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setValues(prev => ({ ...prev, [name]: e.target.value }));
  };

  const handleChangeTouched = (name: string) => {
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  return (
    <section className={styles.container}>
      <h1 className={styles.titleText}>로그인</h1>
      <form className={styles.formContainer}>
        <InputField
          type="text"
          value={values.email}
          placeholder="이메일"
          touched={touched.email}
          error={errors.email}
          onChange={e => handleChangeValue('email', e)}
          onBlur={() => handleChangeTouched('email')}
        />
        <InputField
          type="password"
          value={values.password}
          placeholder="비밀번호"
          touched={touched.password}
          error={errors.password}
          onChange={e => handleChangeValue('password', e)}
          onBlur={() => handleChangeTouched('password')}
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
