// apis/follow.js
import axiosInstance from './axios';

// 특정 사용자가 팔로우 중인지 확인하는 API
async function checkIfFollowing(userId: number) {
  const { data } = await axiosInstance.get(`/users/${userId}/is-following`);
  return data;
}

export { checkIfFollowing };
