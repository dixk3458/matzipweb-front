import { useMutation } from '@tanstack/react-query';
import { followUser, unfollowUser } from '../../apis/follow';
import { UseMutationCustomOptions } from '../../types';
import { queryClient } from '../../utils';
import { queryKeys } from '../../constants';

function useMutateFollowUser(
  isFollowing: boolean,
  mutationOptions?: UseMutationCustomOptions
) {
  const request = isFollowing ? unfollowUser : followUser;
  return useMutation({
    mutationFn: (userId: number) => request(userId),
    onSuccess: (targetUser, userId) => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.FOLLOWING, queryKeys.GET_FOLLOWING, userId],
      });

      queryClient.invalidateQueries({
        queryKey: [queryKeys.GET_PROFILE, targetUser.email],
      });
    },
    ...mutationOptions,
  });
}

export default useMutateFollowUser;
