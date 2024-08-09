import { useMutation } from '@tanstack/react-query';
import { createPost, RequestCreatePost } from '../../apis';
import { UseMutationCustomOptions } from '../../types';
import { queryClient } from '../../utils';
import { queryKeys } from '../../constants';

function useMutateCreatePost(
  userId: number,
  mutationOptions?: UseMutationCustomOptions
) {
  return useMutation({
    mutationFn: (newPost: RequestCreatePost) => createPost(newPost),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [userId, queryKeys.POSTS, queryKeys.GET_POSTS],
      });

      queryClient.invalidateQueries({
        queryKey: [userId, queryKeys.MARKER, queryKeys.GET_MARKERS],
      });
    },
    ...mutationOptions,
  });
}

export default useMutateCreatePost;
