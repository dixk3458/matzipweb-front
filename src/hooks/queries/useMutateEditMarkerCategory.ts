import { useMutation } from '@tanstack/react-query';
import { editMarkerCategory } from '../../apis';
import { Category, UseMutationCustomOptions } from '../../types';
import { queryClient } from '../../utils';
import { queryKeys } from '../../constants';

function useMutateEditMarkerCategory(
  mutationOptions?: UseMutationCustomOptions
) {
  return useMutation({
    mutationFn: (body: Category) => editMarkerCategory(body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.CATEGORY, queryKeys.GET_CATEGORY],
      });
    },
    ...mutationOptions,
  });
}

export default useMutateEditMarkerCategory;
