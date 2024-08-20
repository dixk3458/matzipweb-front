import { useQuery } from '@tanstack/react-query';
import { UseQueryCustomOptions } from '../../types';
import { getBookmarkByPostId } from '../../apis/bookmark';
import { numbers, queryKeys } from '../../constants';

function useGetBookmarkByPostId(
  postId: number,
  queryOptions?: UseQueryCustomOptions<boolean>
) {
  return useQuery({
    queryFn: () => getBookmarkByPostId(postId),
    queryKey: [queryKeys.BOOKMARK, queryKeys.GET_BOOKMARK, postId],
    staleTime: numbers.DEFAULT_STALE_TIME,
    ...queryOptions,
  });
}

export default useGetBookmarkByPostId;
