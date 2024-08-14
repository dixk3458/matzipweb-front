import { useMutation } from '@tanstack/react-query';
import { editProfile, RequestEditProfile } from '../../apis/user';
import { UseMutationCustomOptions } from '../../types';

function useMutateEditProfile(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: (body: RequestEditProfile) => editProfile(body),
    ...mutationOptions,
  });
}

export default useMutateEditProfile;
