import { useMutation } from '@tanstack/react-query';
import { dislikePost, likePost } from '../../apis/like';
import { UseMutationCustomOptions } from '../../types';
import { queryClient } from '../../utils';
import { queryKeys } from '../../constants';

function useMutateLikePost(
  liked: boolean,
  mutationOptions?: UseMutationCustomOptions
) {
  // 이전에 좋아요했다면 싫어요를.
  const request = liked ? dislikePost : likePost;
  return useMutation({
    mutationFn: (postId: number) => request(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.LIKE, queryKeys.GET_LIKE],
      });
    },
    ...mutationOptions,
  });
}

export default useMutateLikePost;
