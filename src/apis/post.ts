import { ImageUri, Post } from '../types';
import axiosInstance from './axios';

type RequestCreatePost = Omit<Post, 'id' | 'author'> & {
  imageUris: ImageUri[];
};

type ResponsePost = Post & { images: ImageUri[] };

async function createPost(body: RequestCreatePost): Promise<ResponsePost> {
  const { data } = await axiosInstance.post('/post', body);

  return data;
}

async function getAllPostsByUserId(userId: number): Promise<Post[]> {
  const { data } = await axiosInstance.get(`/posts?userId=${userId}`);

  return data;
}

export { createPost, getAllPostsByUserId };
export type { RequestCreatePost, ResponsePost };
