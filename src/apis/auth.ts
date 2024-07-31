import { Profile } from '../types';
import axiosInstance from './axios';

type RequestUser = {
  email: string;
  password: string;
};

type ResponseToken = {
  accessToken: string;
};

type ResponseProfile = Profile;

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

async function logout(): Promise<void> {
  await axiosInstance.post('/auth/logout');
}

async function getProfile(): Promise<ResponseProfile> {
  const { data } = await axiosInstance.get('/auth/me');

  return data;
}

async function getAccessToken(): Promise<ResponseToken> {
  const { data } = await axiosInstance.post('/auth/refresh');
  return data;
}
export { postSignup, postSignin, logout, getProfile, getAccessToken };
export type { RequestUser, ResponseToken, ResponseProfile };
