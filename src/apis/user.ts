import { Profile } from '../types';
import axiosInstance from './axios';

type ResponseSearchUser = Profile[];

async function searchUserByKeyword(
  keyword: string
): Promise<ResponseSearchUser> {
  const { data } = await axiosInstance.get('/users/search', {
    params: { keyword },
  });

  return data;
}

export { searchUserByKeyword };
export type { ResponseSearchUser };
