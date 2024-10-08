import { Category } from '../types';
import axiosInstance from './axios';

async function getAllMarkersByUserId(userId: number) {
  const { data } = await axiosInstance.get(`/markers?userId=${userId}`);

  return data;
}

async function editMarkerCategory(body: Category) {
  const { data } = await axiosInstance.put('/markers/category', body);

  return data;
}

async function getMarkerCategory(): Promise<Category> {
  const { data } = await axiosInstance.get('/markers/category');

  return data;
}

export { getAllMarkersByUserId, editMarkerCategory, getMarkerCategory };
