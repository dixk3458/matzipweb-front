import { ChangeEvent } from 'react';
import styles from './InputField.module.css';

interface InputFieldProps {
  type: 'text' | 'password';
  value: string;
  placeholder: string;
  touched: boolean;
  error: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
}

function InputField({
  type,
  value,
  placeholder,
  touched,
  error,
  onChange,
  onBlur,
}: InputFieldProps) {
  return (
    <div
      className={`${styles.container} ${
        touched && error && styles.errorContainer
      }`}
    >
      <input
        className={styles.input}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={e => onChange(e)}
        onBlur={() => onBlur()}
      />
      {touched && true && (
        <p className={styles.errorText}>이메일을 입력해주세요.</p>
      )}
    </div>
  );
}

export default InputField;
