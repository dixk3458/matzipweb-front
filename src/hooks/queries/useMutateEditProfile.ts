import { useMutation } from '@tanstack/react-query';
import { editProfile, RequestEditProfile } from '../../apis/user';
import { UseMutationCustomOptions } from '../../types';
import { queryClient } from '../../utils';
import { queryKeys } from '../../constants';

function useMutateEditProfile(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: (body: RequestEditProfile) => editProfile(body),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.GET_PROFILE, variables.email],
      });
    },
    ...mutationOptions,
  });
}

export default useMutateEditProfile;
