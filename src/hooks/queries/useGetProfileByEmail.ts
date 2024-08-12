import { useQuery } from '@tanstack/react-query';
import { getProfileByEmail } from '../../apis/user';
import { queryKeys } from '../../constants';
import { DetailUser, UseQueryCustomOptions } from '../../types';

function useGetProfileByEmail(
  email: string,
  queryOptions?: UseQueryCustomOptions<DetailUser>
) {
  return useQuery({
    queryFn: () => getProfileByEmail(email),
    queryKey: [queryKeys.GET_PROFILE, email],
    ...queryOptions,
  });
}

export default useGetProfileByEmail;
