import useGetAllCommentsByPostId from '../../../hooks/queries/useGetAllCommentsByPostId';
import AddCommentForm from '../AddCommentForm/AddCommentForm';

import styles from './CommentList.module.css';

interface CommentListProps {
  postId: number;
}

function CommentList({ postId }: CommentListProps) {
  const { data: comments, isLoading } = useGetAllCommentsByPostId(postId);

  console.log(comments);
  return (
    <>
      <div className={styles.commentsSection}>
        <h2>Comments</h2>
        <ul className={styles.commentList}>
          {comments &&
            comments.length > 0 &&
            comments.map(comment => <li key={comment.id}>{comment.text}</li>)}
        </ul>
      </div>
      <AddCommentForm postId={postId} />
    </>
  );
}

export default CommentList;
