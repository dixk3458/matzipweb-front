import useAuth from '../../../hooks/queries/useAuth';
import useGetAllPostsByUserId from '../../../hooks/queries/useGetAllPostsByUserId';

function FeedHomePage() {
  const { getProfileQuery } = useAuth();
  const { id: userId } = getProfileQuery.data! || {};

  const { data: feeds, isLoading, error } = useGetAllPostsByUserId(userId);

  if (isLoading) {
    return <p>로딩중...</p>;
  }
  return <section>FeedHome</section>;
}

export default FeedHomePage;
