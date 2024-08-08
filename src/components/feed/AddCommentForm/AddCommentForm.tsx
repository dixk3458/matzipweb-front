import { ChangeEvent, MouseEvent, useState } from 'react';
import styles from './AddCommentForm.module.css';
import useMutateAddComment from '../../../hooks/queries/useMutateAddComment';

interface AddCommentFormProps {
  postId: number;
}

function AddCommentForm({ postId }: AddCommentFormProps) {
  const addComment = useMutateAddComment(postId);

  const [text, setText] = useState('');

  const handleChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleSubmitComment = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    addComment.mutate(
      { text: text },
      {
        onSuccess: () => {
          console.log('댓글 성공');
          setText('');
        },
        onError: error => {
          console.log(error);
          console.log('댓글 실패');
        },
      }
    );
  };

  return (
    <form className={styles.container}>
      <input
        className={styles.inputField}
        type="text"
        onChange={handleChangeText}
        value={text}
        placeholder="Add a comment..."
      />
      <button
        className={styles.submitButton}
        onClick={event => handleSubmitComment(event)}
      >
        Submit
      </button>
    </form>
  );
}

export default AddCommentForm;
