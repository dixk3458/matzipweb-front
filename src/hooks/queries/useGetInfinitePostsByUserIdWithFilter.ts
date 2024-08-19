import {
  useSuspenseInfiniteQuery,
} from '@tanstack/react-query';
import {
  getBookmarkedPostsByUserId,
  getLikedPostsByUserId,
  getPostsByUserId,
  ResponsePost,
} from '../../apis';
import { queryKeys } from '../../constants';
import { UseInfiniteQueryCustomOptions } from '../../types';
import { Filter } from '../../components/user/FilterMenu/FilterMenu';

function useGetInfinitePostsByUserIdWithFilter(
  userId: number,
  filter: Filter,
  queryOptions?: UseInfiniteQueryCustomOptions<ResponsePost[]>
) {
  let request = getPostsByUserId;

  if (filter === 'like') {
    request = getLikedPostsByUserId;
  } else if (filter === 'bookmark') {
    request = getBookmarkedPostsByUserId;
  }

  return useSuspenseInfiniteQuery({
    queryKey: [queryKeys.POSTS, queryKeys.GET_POSTS, userId, filter],
    queryFn: ({ pageParam = 1 }) => request(userId, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const lastPost = lastPage[lastPage.length - 1];

      return lastPost ? allPages.length + 1 : undefined;
    },
    ...queryOptions,
  });
}

export default useGetInfinitePostsByUserIdWithFilter;
