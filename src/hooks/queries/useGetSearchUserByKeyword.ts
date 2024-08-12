import { useQuery } from '@tanstack/react-query';
import { ResponseSearchUser, searchUserByKeyword } from '../../apis/user';
import { queryKeys } from '../../constants';
import { UseQueryCustomOptions } from '../../types';

function useGetSearchUserByKeyword(
  keyword: string,
  queryOptions?: UseQueryCustomOptions<ResponseSearchUser>
) {
  return useQuery({
    queryFn: () => searchUserByKeyword(keyword),
    queryKey: [queryKeys.SEARCH, queryKeys.GET_SEARCH_USER, keyword], // keyword 추가
    enabled: keyword.length > 0,
    ...queryOptions,
  });
}

export default useGetSearchUserByKeyword;
