import axiosInstance from './axios';

type RequestUser = {
  email: string;
  password: string;
};

type ResponseToken = {
  accessToken: string;
};

async function postSignup({ email, password }: RequestUser) {
  const { data } = await axiosInstance.post('/auth/signup', {
    email,
    password,
  });

  return data;
}

async function postSignin({
  email,
  password,
}: RequestUser): Promise<ResponseToken> {
  const { data } = await axiosInstance.post('/auth/signin', {
    email,
    password,
  });

  return data;
}

export const refreshToken = async () => {
  try {
    const response = await axiosInstance.post('/auth/refresh');
    const { accessToken } = response.data;
    localStorage.setItem('accessToken', accessToken);
    return accessToken;
  } catch (error) {
    console.error('Error refreshing token:', error);
    throw error;
  }
};

export { postSignup, postSignin };
export type { RequestUser, ResponseToken };
