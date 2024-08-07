import { ImageUri, Post } from '../types';
import axiosInstance from './axios';

type RequestCreatePost = Omit<
  Post,
  'id' | 'author' | 'images' | 'createdDate'
> & {
  imageUris: ImageUri[];
};

type ResponsePost = Post;

async function createPost(body: RequestCreatePost): Promise<ResponsePost> {
  const { data } = await axiosInstance.post('/post', body);

  return data;
}

async function getAllPostsByUserId(userId: number): Promise<ResponsePost[]> {
  const { data } = await axiosInstance.get(`/posts?userId=${userId}`);

  return data;
}

async function getPostByPostId(postId: number): Promise<ResponsePost> {
  const { data } = await axiosInstance.get(`/post?postId=${postId}`);

  return data;
}

export { createPost, getAllPostsByUserId, getPostByPostId };
export type { RequestCreatePost, ResponsePost };
