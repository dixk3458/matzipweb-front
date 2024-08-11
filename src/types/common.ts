import {
  QueryKey,
  UseMutationOptions,
  UseQueryOptions,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

type ResponseError = AxiosError<{
  status: string;
  message: string;
  error: string;
}>;

type UseMutationCustomOptions<
  TData = unknown,
  TVariables = unknown,
  TContext = unknown
> = Omit<
  UseMutationOptions<TData, ResponseError, TVariables, TContext>,
  'mutationFn'
>;

type UseQueryCustomOptions<
  TQueryFnData = unknown,
  TError = ResponseError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
> = Omit<
  UseQueryOptions<TQueryFnData, ResponseError, TData, QueryKey>,
  'queryFn' | 'queryKey'
>;

export type { UseMutationCustomOptions, UseQueryCustomOptions };
