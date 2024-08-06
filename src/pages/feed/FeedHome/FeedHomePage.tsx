import useAuth from '../../../hooks/queries/useAuth';
import useGetAllPostsByUserId from '../../../hooks/queries/useGetAllPostsByUserId';

function FeedHomePage() {
  const { getProfileQuery } = useAuth();
  const { id: userId } = getProfileQuery.data! || {};

  const feeds = useGetAllPostsByUserId(userId).data;

  console.log(feeds && feeds[0]);
  return <section>FeedHome</section>;
}

export default FeedHomePage;
