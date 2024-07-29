import axiosInstance from './axios';

type RequestUser = {
  email: string;
  password: string;
};

async function postSignup({ email, password }: RequestUser) {
  const { data } = await axiosInstance.post('/auth/signup', {
    email,
    password,
  });

  return data;
}

export { postSignup };
export type { RequestUser };
