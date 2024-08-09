import axiosInstance from './axios';

async function likePost(postId: number) {
  const { data } = await axiosInstance.post('/like', { data: { postId } });

  return data;
}

async function dislikePost(postId: number) {
  const { data } = await axiosInstance.delete('/like', { data: { postId } });

  return data;
}

export { likePost, dislikePost };
