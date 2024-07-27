import { MouseEvent } from 'react';
import CustomButton from '../../../components/common/CustomButton/CustomButton';
import InputField from '../../../components/common/InputField/InputField';
import useForm from '../../../hooks/useForm';
import { validateSignup } from '../../../utils/validate';

function SignupPage() {
  const { values, touched, errors, getInputProps } = useForm({
    initialValue: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate: validateSignup,
  });

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  return (
    <section>
      <h1>회원가입</h1>
      <form>
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
