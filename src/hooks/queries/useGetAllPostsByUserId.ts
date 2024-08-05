import { useQuery } from '@tanstack/react-query';
import { getAllPostsByUserId } from '../../apis';
import { queryKeys } from '../../constants';
import { Post, UseQueryCustomOptions } from '../../types';

function useGetAllPostsByUserId(
  userId: number,
  queryOptions?: UseQueryCustomOptions<Post[]>
) {
  return useQuery({
    queryFn: () => getAllPostsByUserId(userId),
    queryKey: [userId, queryKeys.POSTS, queryKeys.GET_POSTS],
    ...queryOptions,
  });
}

export default useGetAllPostsByUserId;
