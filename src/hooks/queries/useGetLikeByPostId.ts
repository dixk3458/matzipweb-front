import { useQuery } from '@tanstack/react-query';
import { getLikeByPostId } from '../../apis/like';
import { UseQueryCustomOptions } from '../../types';
import { queryKeys } from '../../constants';

function useGetLikeByPostId(
  postId: number,
  queryOptions?: UseQueryCustomOptions<boolean>
) {
  return useQuery({
    queryFn: () => getLikeByPostId(postId),
    queryKey: [queryKeys.LIKE, queryKeys.GET_LIKE],
    ...queryOptions,
  });
}

export default useGetLikeByPostId;
