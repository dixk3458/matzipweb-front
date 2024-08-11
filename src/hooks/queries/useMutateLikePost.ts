import { useMutation } from '@tanstack/react-query';
import { dislikePost, likePost } from '../../apis/like';
import { UseMutationCustomOptions } from '../../types';
import { queryClient } from '../../utils';
import { queryKeys } from '../../constants';

function useMutateLikePost(
  liked: boolean,
  mutationOptions?: UseMutationCustomOptions<
    void,
    number,
    { previousLikeStatus?: boolean }
  >
) {
  const request = liked ? dislikePost : likePost;

  return useMutation({
    mutationFn: (postId: number) => request(postId),
    onMutate: async (postId: number) => {
      // 해당 쿼리에 대한 현재 진행 중인 모든 요청을 취소]
      // 쿼리가 진행 중일 때 쿼리의 결과가 현재 진행하려는 optimistic update와 충돌 할 수 있다.
      // 이를 방지하고자 쿼리를 취소하고 UI상태를 수동 업데이트
      await queryClient.cancelQueries({
        queryKey: [queryKeys.LIKE, queryKeys.GET_LIKE, postId],
      });

      const previousLikeStatus = queryClient.getQueryData<boolean>([
        queryKeys.LIKE,
        queryKeys.GET_LIKE,
        postId,
      ]);

      // 서버로부터 응답받기전 UI를 즉시 반영
      queryClient.setQueryData(
        [queryKeys.LIKE, queryKeys.GET_LIKE, postId],
        !liked
      );

      return { previousLikeStatus };
    },
    onError: (error, postId, context) => {
      if (context?.previousLikeStatus !== undefined) {
        queryClient.setQueryData(
          [queryKeys.LIKE, queryKeys.GET_LIKE, postId],
          context.previousLikeStatus
        );
      }
      console.log(error);
    },
    // 쿼리가 다시 활성화될 때 최신 데이터로 갱신
    onSettled: (data, error, postId) => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.LIKE, queryKeys.GET_LIKE, postId],
      });
    },
    ...mutationOptions,
  });
}

export default useMutateLikePost;
