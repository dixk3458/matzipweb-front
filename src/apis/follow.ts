// apis/follow.js
import { ProfileUser } from '../types';
import axiosInstance from './axios';

type ResponseCheckIfFollowing = {
  isFollowing: boolean;
};

// 특정 사용자가 팔로우 중인지 확인하는 API
async function checkIfFollowing(
  userId: number
): Promise<ResponseCheckIfFollowing> {
  const { data } = await axiosInstance.get(`/users/${userId}/is-following`);
  return data;
}

async function followUser(userId: number): Promise<ProfileUser> {
  const { data } = await axiosInstance.post(`/users/${userId}/follow`);

  return data;
}

async function unfollowUser(userId: number): Promise<ProfileUser> {
  const { data } = await axiosInstance.delete(`/users/${userId}/unfollow`);

  return data;
}

export { checkIfFollowing, followUser, unfollowUser };
export type { ResponseCheckIfFollowing };
