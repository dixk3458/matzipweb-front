import { useQuery } from '@tanstack/react-query';
import { getPostByPostId } from '../../apis';
import { queryKeys } from '../../constants';
import { UseQueryCustomOptions } from '../../types';

function useGetPostByPostId(
  postId: number,
  queryOptions?: UseQueryCustomOptions
) {
  return useQuery({
    queryFn: () => getPostByPostId(postId),
    queryKey: [queryKeys.POST, queryKeys.GET_POST, postId],
    ...queryOptions,
  });
}


export default useGetPostByPostId