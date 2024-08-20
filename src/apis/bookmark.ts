import axiosInstance from './axios';

async function bookmarkPost(postId: number): Promise<void> {
  const { data } = await axiosInstance.post('/bookmark', { postId });

  return data;
}

async function removeBookmarkPost(postId: number): Promise<void> {
  const { data } = await axiosInstance.delete('/bookmark', { data: postId });

  return data;
}

async function getBookmarkByPostId(postId: number): Promise<boolean> {
  const { data } = await axiosInstance.get(`/bookmark?postId=${postId}`);

  return data;
}

export { bookmarkPost, removeBookmarkPost, getBookmarkByPostId };
