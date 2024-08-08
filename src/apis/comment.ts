import { Comment } from '../types';
import axiosInstance from './axios';

type RequestAddComment = {
  text: string;
};

type ResponseGetAllComments = Comment[];

async function addComment(
  body: RequestAddComment,
  postId: number
): Promise<void> {
  const { data } = await axiosInstance.post(`/comment?postId=${postId}`, body);

  return data;
}

async function getAllCommentsByPostId(
  postId: number
): Promise<ResponseGetAllComments> {
  const { data } = await axiosInstance.get(`/comments?postId=${postId}`);
  return data;
}

export { addComment, getAllCommentsByPostId };
export type { RequestAddComment, ResponseGetAllComments };
