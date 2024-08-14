import { DetailUser, ProfileUser } from '../types';
import axiosInstance from './axios';

type ResponseSearchUser = ProfileUser[];

type RequestEditProfile = Omit<ProfileUser, 'id'>;

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

async function editProfile(body: RequestEditProfile): Promise<void> {
  const { data } = await axiosInstance.put('/edit', body);

  return data;
}

export { searchUserByKeyword, getProfileByEmail,editProfile };
export type { ResponseSearchUser ,RequestEditProfile};
