import { useMutation } from '@tanstack/react-query';
import { uploadImages } from '../../apis/image';
import { UseMutationCustomOptions } from '../../types';

function useMutateUploadImages(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: (formData: FormData) => uploadImages(formData),
    ...mutationOptions,
  });
}

export default useMutateUploadImages;
