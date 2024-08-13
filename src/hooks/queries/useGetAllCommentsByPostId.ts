import { useQuery } from '@tanstack/react-query';
import {
  getAllCommentsByPostId,
  ResponseGetAllComments,
} from '../../apis/comment';
import { queryKeys } from '../../constants';
import { UseQueryCustomOptions } from '../../types';

function useGetAllCommentsByPostId(
  postId: number,
  queryOptions?: UseQueryCustomOptions<ResponseGetAllComments>
) {
  return useQuery({
    queryFn: () => getAllCommentsByPostId(postId),
    queryKey: [queryKeys.COMMENTS, queryKeys.GET_COMMENTS, postId],
    ...queryOptions,
  });
}

export default useGetAllCommentsByPostId;
