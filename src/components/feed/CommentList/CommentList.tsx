import useGetAllCommentsByPostId from '../../../hooks/queries/useGetAllCommentsByPostId';
import useCurrentPostIdStore from '../../../store/useCurrentPostIdStore';
import ProfileCard from '../../common/ProfileCard/ProfileCard';
import AddCommentForm from '../AddCommentForm/AddCommentForm';

import styles from './CommentList.module.css';

function CommentList() {
  const { currentPostId } = useCurrentPostIdStore();
  const { data: comments, isLoading } = useGetAllCommentsByPostId(
    currentPostId!
  );

  return (
    <>
      <ul className={styles.commentList}>
        {comments &&
          comments.length > 0 &&
          comments.map(({ author, id, text }) => (
            <li key={id} className={styles.commentItem}>
              <ProfileCard user={author} />
              <p className={styles.commentText}>{text}</p>
            </li>
          ))}
      </ul>
      <AddCommentForm />
    </>
  );
}

export default CommentList;
