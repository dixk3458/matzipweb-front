import { useMutation } from '@tanstack/react-query';
import { dislikePost, likePost } from '../../apis/like';

function useMutateLikePost(liked: boolean) {
  // 이전에 좋아요했다면 싫어요를.
  const request = liked ? dislikePost : likePost;
  return useMutation({
    mutationFn: (postId: number) => request(postId),
  });
}

export default useMutateLikePost;
