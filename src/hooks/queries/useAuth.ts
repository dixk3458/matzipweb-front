import { useMutation } from '@tanstack/react-query';
import { logout, postSignin, postSignup } from '../../apis/auth';
import { UseMutationCustomOptions } from '../../types';
import { queryKeys, storageKeys } from '../../constants/keys';
import {
  queryClient,
  removeHeader,
  removeLocalStorage,
  setHeader,
  setLocalStorage,
} from '../../utils';

function useSignup(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postSignup,
    ...mutationOptions,
    onError: error => {
      console.log(error);
    },
  });
}

function useSignin(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postSignin,
    onSuccess: ({ accessToken }) => {
      setLocalStorage(storageKeys.ACCESS_TOKEN, accessToken);
      setHeader('Authorization', `Bearer ${accessToken}`);
    },
    onError: error => {
      console.log(error);
    },
    ...mutationOptions,
  });
}

function useLogout(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      removeLocalStorage(storageKeys.ACCESS_TOKEN);
      removeHeader('Authorization');
      queryClient.resetQueries({ queryKey: [queryKeys.AUTH] });
      console.log('로그아웃 성공');
    },
    onError: error => {
      console.log(error);
      console.log('로그아웃 실패');
    },
    ...mutationOptions,
  });
}

function useAuth() {
  const signupMutation = useSignup();
  const signinMutation = useSignin();
  const logoutMutation = useLogout();

  return { signupMutation, signinMutation, logoutMutation };
}

export default useAuth;
