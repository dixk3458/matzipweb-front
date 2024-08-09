import { useMutation } from '@tanstack/react-query';
import { UseMutationCustomOptions } from '../../types';
import { bookmarkPost, removeBookmarkPost } from '../../apis/bookmark';

function useMutateBookmarkPost(
  bookmarked: boolean,
  mutationOptions?: UseMutationCustomOptions
) {
  const request = bookmarked ? removeBookmarkPost : bookmarkPost;

  return useMutation({
    mutationFn: (postId: number) => request(postId),
    ...mutationOptions,
  });
}

export default useMutateBookmarkPost;
