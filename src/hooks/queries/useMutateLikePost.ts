import { useMutation } from '@tanstack/react-query';
import { dislikePost, likePost } from '../../apis/like';
import { UseMutationCustomOptions } from '../../types';

function useMutateLikePost(
  liked: boolean,
  mutationOptions?: UseMutationCustomOptions
) {
  // 이전에 좋아요했다면 싫어요를.
  const request = liked ? dislikePost : likePost;
  return useMutation({
    mutationFn: (postId: number) => request(postId),
    ...mutationOptions,
  });
}

export default useMutateLikePost;
