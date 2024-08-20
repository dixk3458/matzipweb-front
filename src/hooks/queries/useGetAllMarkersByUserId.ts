import { useQuery } from '@tanstack/react-query';
import { getAllMarkersByUserId } from '../../apis';
import { numbers, queryKeys } from '../../constants';
import { Marker, UseQueryCustomOptions } from '../../types';

function useGetAllMarkersByUserId(
  userId: number,
  queryOptions?: UseQueryCustomOptions<Marker[]>
) {
  return useQuery({
    queryFn: () => getAllMarkersByUserId(userId),
    queryKey: [userId, queryKeys.MARKER, queryKeys.GET_MARKERS],
    staleTime: numbers.DEFAULT_STALE_TIME,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    ...queryOptions,
  });
}

export default useGetAllMarkersByUserId;
