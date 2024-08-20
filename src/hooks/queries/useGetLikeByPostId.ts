import { useQuery } from '@tanstack/react-query';
import { getLikeByPostId } from '../../apis/like';
import { UseQueryCustomOptions } from '../../types';
import { numbers, queryKeys } from '../../constants';

function useGetLikeByPostId(
  postId: number,
  queryOptions?: UseQueryCustomOptions<boolean>
) {
  return useQuery({
    queryFn: () => getLikeByPostId(postId),
    queryKey: [queryKeys.LIKE, queryKeys.GET_LIKE, postId],
    staleTime: numbers.DEFAULT_STALE_TIME,
    ...queryOptions,
  });
}

export default useGetLikeByPostId;
