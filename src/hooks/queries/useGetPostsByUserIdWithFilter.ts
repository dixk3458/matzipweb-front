import { useQuery } from '@tanstack/react-query';
import { Filter } from '../../components/user/FilterMenu/FilterMenu';
import {
  getAllPostsByUserId,
  getBookmarkedPostsByUserId,
  getLikedPostsByUserId,
} from '../../apis';
import { queryKeys } from '../../constants';
import { Post, UseQueryCustomOptions } from '../../types';

function useGetPostsByUserIdWithFilter(
  userId: number,
  filter: Filter,
  queryOptions?: UseQueryCustomOptions<Post[]>
) {
  let request = getAllPostsByUserId;

  if (filter === 'like') {
    request = getLikedPostsByUserId;
  } else if (filter === 'bookmark') {
    request = getBookmarkedPostsByUserId;
  }

  return useQuery({
    queryFn: () => request(userId),
    queryKey: [queryKeys.POSTS, queryKeys.GET_POSTS, userId, filter],
    ...queryOptions,
  });
}

export default useGetPostsByUserIdWithFilter;
