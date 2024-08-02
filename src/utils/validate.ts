type UserInformation = {
  email: string;
  password: string;
};

type PostInformation = {
  title: string;
  description: string;
};

function validate(values: UserInformation) {
  const errors = {
    email: '',
    password: '',
  };

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = '올바른 이메일 형식이 아닙니다.';
  }
  if (!(values.password.length >= 8 && values.password.length <= 20)) {
    errors.password = '비밀번호는 8~20자 사이로 입력해주세요.';
  }

  return errors;
}

function validateSignin(values: UserInformation) {
  const errors = validate(values);

  return errors;
}

function validateSignup(values: UserInformation & { confirmPassword: string }) {
  const errors = validate(values);

  const newErrors = { ...errors, confirmPassword: '' };

  if (values.password !== values.confirmPassword) {
    newErrors.confirmPassword = '비밀번호와 일치하지않습니다.';
  }

  return newErrors;
}

function validateAddPost(values: PostInformation) {
  const errors = {
    title: '',
    description: '',
  };

  if (values.title.length < 5) {
    errors.title = '제목을 5자 이상으로 입력해 주세요.';
  }

  if (values.description.length < 5) {
    errors.description = '설명을 5자 이상으로 입력해 주세요.';
  }

  return errors;
}

export { validateSignin, validateSignup, validateAddPost };

export type { UserInformation };
