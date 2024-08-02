import { ChangeEvent } from 'react';
import styles from './TextAreaField.module.css';

interface TextAreaFieldProps {
  value: string;
  error: string;
  touched: boolean;
  onBlur: () => void;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

function TextAreaField({
  value,
  error,
  touched,
  onBlur,
  onChange,
}: TextAreaFieldProps) {
  return (
    <div className={`${styles.container} ${touched && error && styles.error}`}>
      <textarea
        placeholder="설명을 입력해 주세요"
        value={value}
        className={styles.textArea}
        rows={12}
        cols={20}
        onBlur={() => onBlur()}
        onChange={event => onChange(event)}
      />
      {error && <p className={styles.errorText}>{error}</p>}
    </div>
  );
}

export default TextAreaField;
