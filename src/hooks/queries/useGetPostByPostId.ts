import { useSuspenseQuery } from '@tanstack/react-query';
import { getPostByPostId } from '../../apis';
import { queryKeys } from '../../constants';
import { Post, UseQueryCustomOptions } from '../../types';

function useGetPostByPostId(
  postId: number,
  queryOptions?: UseQueryCustomOptions<Post>
) {
  return useSuspenseQuery({
    queryFn: () => getPostByPostId(postId),
    queryKey: [queryKeys.POST, queryKeys.GET_POST, postId],
    ...queryOptions,
  });
}

export default useGetPostByPostId;
