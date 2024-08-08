import axiosInstance from './axios';

type RequestAddComment = {
  text: string;
};

async function addComment(
  body: RequestAddComment,
  postId: number
): Promise<void> {
  const { data } = await axiosInstance.post(`/comment?postId=${postId}`, body);

  return data;
}

export { addComment };
export type { RequestAddComment };
