import axiosInstance from './axios';

async function bookmarkPost(postId: number) {
  const { data } = await axiosInstance.post('/bookmark', { data: postId });

  return data;
}

async function removeBookmarkPost(postId: number) {
  const { data } = await axiosInstance.delete('/bookmark', { data: postId });

  return data;
}

export {bookmarkPost,removeBookmarkPost}