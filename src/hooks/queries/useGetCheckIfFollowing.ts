import { useQuery } from '@tanstack/react-query';
import { checkIfFollowing, ResponseCheckIfFollowing } from '../../apis/follow';
import { queryKeys } from '../../constants';
import { UseQueryCustomOptions } from '../../types';

function useGetCheckIfFollowing(
  userId: number,
  queryOptions?: UseQueryCustomOptions<ResponseCheckIfFollowing>
) {
  return useQuery({
    queryFn: () => checkIfFollowing(userId),
    queryKey: [queryKeys.FOLLOWING, queryKeys.GET_FOLLOWING, userId],
    ...queryOptions,
  });
}

export default useGetCheckIfFollowing;
