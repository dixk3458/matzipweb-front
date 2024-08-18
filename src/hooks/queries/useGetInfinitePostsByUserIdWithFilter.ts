import { useInfiniteQuery } from '@tanstack/react-query';
import {
  getBookmarkedPostsByUserId,
  getLikedPostsByUserId,
  getPostsByUserId,
  RequestGetPosts,
  ResponsePost,
} from '../../apis';
import { queryKeys } from '../../constants';
import { UseInfiniteQueryCustomOptions } from '../../types';
import { Filter } from '../../components/user/FilterMenu/FilterMenu';

function useGetInfinitePostsByUserIdWithFilter(
  filter: Filter,
  params: RequestGetPosts,
  queryOptions?: UseInfiniteQueryCustomOptions<ResponsePost[]>
) {
  let request = getPostsByUserId;

  if (filter === 'like') {
    request = getLikedPostsByUserId;
  } else if (filter === 'bookmark') {
    request = getBookmarkedPostsByUserId;
  }

  return useInfiniteQuery({
    queryKey: [queryKeys.POSTS, queryKeys.GET_POSTS, params.userId, filter],
    queryFn: () => request(params),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const lastPost = lastPage[lastPage.length - 1];

      return lastPost ? allPages.length + 1 : undefined;
    },
    ...queryOptions,
  });
}

export default useGetInfinitePostsByUserIdWithFilter;
