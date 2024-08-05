import axiosInstance from './axios';

async function getAllMarkersByUserId(userId: number) {
  const { data } = await axiosInstance.get(`/markers?userId=${userId}`);

  return data;
}

export { getAllMarkersByUserId };
