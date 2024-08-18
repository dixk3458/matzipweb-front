import { useInfiniteQuery } from '@tanstack/react-query';
import { getPosts, ResponsePost } from '../../apis';
import { UseInfiniteQueryCustomOptions } from '../../types';
import { queryKeys } from '../../constants';

function useGetInfinitePosts(
  queryOptions?: UseInfiniteQueryCustomOptions<ResponsePost[]>
) {
  return useInfiniteQuery({
    queryKey: [queryKeys.POSTS, queryKeys.GET_POSTS],
    queryFn: ({ pageParam = 1 }) => getPosts(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const lastPost = lastPage[lastPage.length - 1];

      return lastPost ? allPages.length + 1 : undefined;
    },
    ...queryOptions,
  });
}

export default useGetInfinitePosts;
