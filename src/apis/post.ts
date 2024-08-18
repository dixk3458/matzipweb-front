import { ImageUri, Post } from '../types';
import axiosInstance from './axios';

type RequestCreatePost = Omit<
  Post,
  'id' | 'author' | 'images' | 'createdDate'
> & {
  imageUris: ImageUri[];
};

type ResponsePost = Post;

type RequestGetPosts = {
  userId: number;
  page: number;
};

async function createPost(body: RequestCreatePost): Promise<ResponsePost> {
  const { data } = await axiosInstance.post('/post', body);

  return data;
}

async function deletePost(postId: number) {
  const { data } = await axiosInstance.delete(`/post?postId=${postId}`);

  return data;
}

async function getPostByPostId(postId: number): Promise<ResponsePost> {
  const { data } = await axiosInstance.get(`/post?postId=${postId}`);

  return data;
}

async function getPostsByUserId(
  params: RequestGetPosts
): Promise<ResponsePost[]> {
  const { data } = await axiosInstance.get('/posts', {
    params,
  });

  return data;
}

async function getLikedPostsByUserId(
  params: RequestGetPosts
): Promise<ResponsePost[]> {
  const { data } = await axiosInstance.get('/posts/liked', {
    params,
  });

  return data;
}

async function getBookmarkedPostsByUserId(
  params: RequestGetPosts
): Promise<ResponsePost[]> {
  const { data } = await axiosInstance.get('/posts/bookmarked', {
    params,
  });

  return data;
}

export {
  createPost,
  deletePost,
  getPostByPostId,
  getLikedPostsByUserId,
  getPostsByUserId,
  getBookmarkedPostsByUserId,
};
export type { RequestCreatePost, ResponsePost, RequestGetPosts };
