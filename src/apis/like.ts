import axiosInstance from './axios';

async function likePost(postId: number): Promise<void> {
  const { data } = await axiosInstance.post('/like', { data: { postId } });

  return data;
}

async function dislikePost(postId: number): Promise<void> {
  const { data } = await axiosInstance.delete('/like', { data: { postId } });

  return data;
}

async function getLikeByPostId(postId: number): Promise<boolean> {
  const { data } = await axiosInstance.get(`/like?postId=${postId}`);

  return data;
}

export { likePost, dislikePost, getLikeByPostId };
