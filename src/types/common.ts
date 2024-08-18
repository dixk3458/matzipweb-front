import {
  InfiniteData,
  QueryKey,
  UseInfiniteQueryOptions,
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

// interface InfiniteData<TQueryFnData> {
//   pages: TQueryFnData[];     // 각 페이지의 데이터 배열
//   pageParams: unknown[];     // 각 페이지를 로드할 때 사용된 매개변수
// }

type UseInfiniteQueryCustomOptions<
  TQueryFnData = unknown, // queryFn에서 반환되는 타입
  TError = ResponseError,
  TData = InfiniteData<TQueryFnData, number>, // 쿼리가 최종적으로 반환하는 데이터의 타입, useInfiniteQuery를 사용하면 페이지별 데이터를 로드하는데, 즉 여러 페이지의 데이터를 포함하는 전체구조
  TQueryData = TQueryFnData, // 페이지별로 로드할 때 반환되는 데이터 타입
  TQueryKey extends QueryKey = QueryKey,
  TPageParam = number
> = Omit<
  UseInfiniteQueryOptions<
    TQueryFnData,
    TError,
    TData,
    TQueryData,
    TQueryKey,
    TPageParam
  >,
  'queryFn' | 'queryKey'
>;

export type {
  UseMutationCustomOptions,
  UseQueryCustomOptions,
  UseInfiniteQueryCustomOptions,
};
