import { useMutation } from '@tanstack/react-query';
import { UseMutationCustomOptions } from '../../types';
import { bookmarkPost, removeBookmarkPost } from '../../apis/bookmark';
import { queryClient } from '../../utils';
import { queryKeys } from '../../constants';

function useMutateBookmarkPost(
  bookmarked: boolean,
  mutationOptions?: UseMutationCustomOptions<
    void,
    number,
    { previousBookmarkStatus?: boolean }
  >
) {
  const request = bookmarked ? removeBookmarkPost : bookmarkPost;

  return useMutation({
    mutationFn: (postId: number) => request(postId),
    onMutate: async (postId: number) => {
      await queryClient.cancelQueries({
        queryKey: [queryKeys.BOOKMARK, queryKeys.GET_BOOKMARK, postId],
      });

      const previousBookmarkStatus = queryClient.getQueryData<boolean>([
        queryKeys.BOOKMARK,
        queryKeys.GET_BOOKMARK,
        postId,
      ]);

      queryClient.setQueryData(
        [queryKeys.BOOKMARK, queryKeys.GET_BOOKMARK, postId],
        !bookmarked
      );

      return { previousBookmarkStatus };
    },
    onError: (error, postId, context) => {
      if (context?.previousBookmarkStatus !== undefined) {
        queryClient.setQueryData(
          [queryKeys.BOOKMARK, queryKeys.GET_BOOKMARK, postId],
          context.previousBookmarkStatus
        );
      }
      console.log(error);
    },
    onSettled: (data, error, postId) => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.BOOKMARK, queryKeys.GET_BOOKMARK, postId],
      });
    },
    ...mutationOptions,
  });
}

export default useMutateBookmarkPost;
