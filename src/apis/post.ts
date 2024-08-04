import { ImageUri, Post } from '../types';
import axiosInstance from './axios';

type RequestCreatePost = Omit<Post, 'id'> & { imageUris: ImageUri[] };

type ResponsePost = Post & { images: ImageUri[] };

async function createPost(body: RequestCreatePost): Promise<ResponsePost> {
  console.log(body);
  const { data } = await axiosInstance.post('/post', body);

  return data;
}

export { createPost };
export type { RequestCreatePost, ResponsePost };
