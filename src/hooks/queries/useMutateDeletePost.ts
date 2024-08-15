import { useMutation } from '@tanstack/react-query';
import { deletePost } from '../../apis';
import { UseMutationCustomOptions } from '../../types';

function useMutateDeletePost(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: (postId: number) => deletePost(postId),
    ...mutationOptions,
  });
}

export default useMutateDeletePost;
