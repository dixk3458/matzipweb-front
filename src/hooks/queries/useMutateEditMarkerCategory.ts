import { useMutation } from '@tanstack/react-query';
import { editMarkerCategory } from '../../apis';
import { Category, UseMutationCustomOptions } from '../../types';

function useMutateEditMarkerCategory(
  mutationOptions?: UseMutationCustomOptions
) {
  return useMutation({
    mutationFn: (body: Category) => editMarkerCategory(body),
    ...mutationOptions,
  });
}

export default useMutateEditMarkerCategory;
