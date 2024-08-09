import { useMutation } from '@tanstack/react-query';
import { addComment, RequestAddComment } from '../../apis/comment';
import { UseMutationCustomOptions } from '../../types';
import { queryClient } from '../../utils';
import { queryKeys } from '../../constants';

function useMutateAddComment(
  postId: number,
  mutationOptions?: UseMutationCustomOptions
) {
  return useMutation({
    mutationFn: (body: RequestAddComment) => addComment(body, postId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.COMMENTS, queryKeys.GET_COMMENTS, postId],
      });
    },
    ...mutationOptions,
  });
}

export default useMutateAddComment;
