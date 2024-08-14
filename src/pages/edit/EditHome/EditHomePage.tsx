import EditProfileForm from '../../../components/edit/EditProfileForm/EditProfileForm';
import useAuth from '../../../hooks/queries/useAuth';

import styles from './EditHomePage.module.css';

function EditHomePage() {
  const { getProfileQuery } = useAuth();

  const user = getProfileQuery.data;

  return (
    <section className={styles.container}>
      {user && <EditProfileForm user={user} />}
    </section>
  );
}

export default EditHomePage;
