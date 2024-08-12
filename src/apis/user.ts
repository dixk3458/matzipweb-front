import { DetailUser, ProfileUser } from '../types';
import axiosInstance from './axios';

type ResponseSearchUser = ProfileUser[];

async function searchUserByKeyword(
  keyword: string
): Promise<ResponseSearchUser> {
  const { data } = await axiosInstance.get('/users/search', {
    params: { keyword },
  });

  return data;
}

async function getProfileByEmail(email: string): Promise<DetailUser> {
  const { data } = await axiosInstance.get(`/users?email=${email}`);

  return data;
}

export { searchUserByKeyword, getProfileByEmail };
export type { ResponseSearchUser };
