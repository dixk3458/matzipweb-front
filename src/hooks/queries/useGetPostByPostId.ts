import { useSuspenseQuery } from '@tanstack/react-query';
import { getPostByPostId } from '../../apis';
import { numbers, queryKeys } from '../../constants';
import { Post, UseQueryCustomOptions } from '../../types';

function useGetPostByPostId(
  postId: number,
  queryOptions?: UseQueryCustomOptions<Post>
) {
  return useSuspenseQuery({
    queryFn: () => getPostByPostId(postId),
    queryKey: [queryKeys.POST, queryKeys.GET_POST, postId],
    staleTime: numbers.DEFAULT_STALE_TIME,
    ...queryOptions,
  });
}

export default useGetPostByPostId;
