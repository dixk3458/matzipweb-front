import { ChangeEvent, MouseEvent, useState } from 'react';
import styles from './AddCommentForm.module.css';

function AddCommentForm() {
  const [text, setText] = useState('');

  const handleChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleSubmitComment = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(text);
    // Add logic to handle comment submission
    setText('');
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
      <button className={styles.submitButton} onClick={handleSubmitComment}>
        Submit
      </button>
    </form>
  );
}

export default AddCommentForm;
