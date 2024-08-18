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

async function deletePost(postId: number) {
  const { data } = await axiosInstance.delete(`/post?postId=${postId}`);

  return data;
}

async function getPostByPostId(postId: number): Promise<ResponsePost> {
  const { data } = await axiosInstance.get(`/post?postId=${postId}`);

  return data;
}

async function getPostsByUserId(
  userId: number,
  pageParam: number
): Promise<ResponsePost[]> {
  const { data } = await axiosInstance.get('/posts', {
    params: {
      userId: userId,
      page: pageParam,
    },
  });

  return data;
}

async function getLikedPostsByUserId(
  userId: number,
  pageParam: number
): Promise<ResponsePost[]> {
  const { data } = await axiosInstance.get('/posts/liked', {
    params: {
      userId: userId,
      page: pageParam,
    },
  });

  return data;
}

async function getBookmarkedPostsByUserId(
  userId: number,
  pageParam: number
): Promise<ResponsePost[]> {
  const { data } = await axiosInstance.get('/posts/bookmarked', {
    params: {
      userId: userId,
      page: pageParam,
    },
  });

  return data;
}

async function getPosts(pageParam: number) {
  const { data } = await axiosInstance.get('/posts/all', {
    params: {
      page: pageParam,
    },
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
  getPosts,
};
export type { RequestCreatePost, ResponsePost };
