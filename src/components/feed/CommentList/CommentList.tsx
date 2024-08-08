import useGetAllCommentsByPostId from '../../../hooks/queries/useGetAllCommentsByPostId';
import ProfileCard from '../../common/ProfileCard/ProfileCard';
import AddCommentForm from '../AddCommentForm/AddCommentForm';

import styles from './CommentList.module.css';

interface CommentListProps {
  postId: number;
}

function CommentList({ postId }: CommentListProps) {
  const { data: comments, isLoading } = useGetAllCommentsByPostId(postId);

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
      <AddCommentForm postId={postId} />
    </>
  );
}

export default CommentList;
