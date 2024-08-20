import { useQuery } from '@tanstack/react-query';
import { getProfileByEmail } from '../../apis/user';
import { numbers, queryKeys } from '../../constants';
import { DetailUser, UseQueryCustomOptions } from '../../types';

function useGetProfileByEmail(
  email: string,
  queryOptions?: UseQueryCustomOptions<DetailUser>
) {
  return useQuery({
    queryFn: () => getProfileByEmail(email),
    queryKey: [queryKeys.GET_PROFILE, email],
    staleTime: numbers.DEFAULT_STALE_TIME,
    ...queryOptions,
  });
}

export default useGetProfileByEmail;
