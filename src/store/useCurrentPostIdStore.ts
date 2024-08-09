import { create } from 'zustand';

type CurrentPostIdStore = {
  currentPostId: number | null;
  setCurrentPostId: (post: number | null) => void;
};

const useCurrentPostIdStore = create<CurrentPostIdStore>(set => ({
  currentPostId: 0,
  setCurrentPostId: postId =>
    set(state => ({ ...state, currentPostId: postId })),
}));

export default useCurrentPostIdStore;
