import { useMutation, useQuery } from '@tanstack/react-query';
import {
  getAccessToken,
  getProfile,
  logout,
  postSignin,
  postSignup,
  ResponseProfile,
} from '../../apis/auth';
import { UseMutationCustomOptions, UseQueryCustomOptions } from '../../types';
import { queryKeys, storageKeys } from '../../constants/keys';
import {
  queryClient,
  removeHeader,
  removeLocalStorage,
  setHeader,
  setLocalStorage,
} from '../../utils';
import { numbers } from '../../constants';
import { useEffect } from 'react';

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
    onSettled: () => {
      // 로그인에 성공하든 실패하든 상관없이
      queryClient.refetchQueries({
        queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],
      });
    }, // 성공 실패 상관없이 수행
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

function useGetProfile(queryOptions?: UseQueryCustomOptions<ResponseProfile>) {
  return useQuery({
    queryFn: getProfile,
    queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],
    ...queryOptions,
  });
}

function useGetRefreshToken() {
  const { isSuccess, isError, data, isPending } = useQuery({
    queryFn: getAccessToken,
    queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
    staleTime: numbers.ACCESS_TOKEN_REFRESH_TIME,
    refetchInterval: numbers.ACCESS_TOKEN_REFRESH_TIME,
    refetchOnReconnect: true,
    refetchIntervalInBackground: true,
  });

  useEffect(() => {
    if (isSuccess) {
      setHeader('Authorization', `Bearer ${data.accessToken}`);
      setLocalStorage(storageKeys.ACCESS_TOKEN, data.accessToken);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      removeHeader('Authorization');
      removeLocalStorage(storageKeys.ACCESS_TOKEN);
    }
  }, [isError]);

  return { isSuccess, isError, isPending };
}

function useAuth() {
  const signupMutation = useSignup();
  const refreshTokenQuery = useGetRefreshToken();
  const signinMutation = useSignin();
  const logoutMutation = useLogout();

  const getProfileQuery = useGetProfile({
    enabled: refreshTokenQuery.isSuccess,
  });

  const isLogin = getProfileQuery.isSuccess;
  const isLoginLoading =
    refreshTokenQuery.isPending || getProfileQuery.isLoading;

  return {
    signupMutation,
    signinMutation,
    logoutMutation,
    getProfileQuery,
    isLogin,
    isLoginLoading,
  };
}

export default useAuth;
