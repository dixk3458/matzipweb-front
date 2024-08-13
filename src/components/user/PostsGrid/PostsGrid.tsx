import useGetPostsByUserIdWithFilter from '../../../hooks/queries/useGetPostsByUserIdWithFilter';
import { Filter } from '../FilterMenu/FilterMenu';

interface PostsGridProps {
  currentUserId: number;
  filter: Filter;
}

function PostsGrid({ currentUserId, filter }: PostsGridProps) {
  const {
    data: filteredPosts,
    isLoading,
    error,
  } = useGetPostsByUserIdWithFilter(currentUserId, filter);

  console.log(filteredPosts);
  return <></>;
}

export default PostsGrid;
