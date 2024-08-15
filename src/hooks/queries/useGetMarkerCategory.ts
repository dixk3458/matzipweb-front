import { useQuery } from '@tanstack/react-query';
import { getMarkerCategory } from '../../apis';
import { queryKeys } from '../../constants';
import { Category, UseQueryCustomOptions } from '../../types';

function useGetMarkerCategory(queryOptions?: UseQueryCustomOptions<Category>) {
  return useQuery({
    queryFn: () => getMarkerCategory(),
    queryKey: [queryKeys.CATEGORY, queryKeys.GET_CATEGORY],
    ...queryOptions,
  });
}

export default useGetMarkerCategory;
