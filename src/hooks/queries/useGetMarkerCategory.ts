import { useQuery } from '@tanstack/react-query';
import { getMarkerCategory } from '../../apis';
import { numbers, queryKeys } from '../../constants';
import { Category, UseQueryCustomOptions } from '../../types';

function useGetMarkerCategory(queryOptions?: UseQueryCustomOptions<Category>) {
  return useQuery({
    queryFn: () => getMarkerCategory(),
    queryKey: [queryKeys.CATEGORY, queryKeys.GET_CATEGORY],
    staleTime: numbers.DEFAULT_STALE_TIME,
    ...queryOptions,
  });
}

export default useGetMarkerCategory;
