import { useMutation } from '@tanstack/react-query';
import { addComment, RequestAddComment } from '../../apis/comment';
import { UseMutationCustomOptions } from '../../types';

function useMutateAddComment(
  postId: number,
  mutationOptions?: UseMutationCustomOptions
) {
  return useMutation({
    mutationFn: (body: RequestAddComment) => addComment(body, postId),
    ...mutationOptions,
  });
}

export default useMutateAddComment;
