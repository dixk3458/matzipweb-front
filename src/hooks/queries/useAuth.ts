import { useMutation } from '@tanstack/react-query';
import { postSignin, postSignup } from '../../apis/auth';
import { UseMutationCustomOptions } from '../../types';
import { setLocalStorage } from '../../utils/localStorage';
import { storageKeys } from '../../constants/keys';

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
    },
    onError: error => {
      console.log(error);
    },
    ...mutationOptions,
  });
}

function useAuth() {
  const signupMutation = useSignup();
  const signinMutation = useSignin();

  return { signupMutation, signinMutation };
}

export default useAuth;
