import { ImageUri } from '../types';
import axiosInstance from './axios';

async function uploadImages(body: FormData): Promise<ImageUri[]> {
  const { data } = await axiosInstance.post('/image', body, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
}

export { uploadImages };
