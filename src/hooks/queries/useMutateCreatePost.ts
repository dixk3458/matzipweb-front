import { useMutation } from '@tanstack/react-query';
import { createPost, RequestCreatePost } from '../../apis';
import { UseMutationCustomOptions } from '../../types';

function useMutateCreatePost(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: (newPost: RequestCreatePost) => createPost(newPost),
    ...mutationOptions,
  });
}

export default useMutateCreatePost;
