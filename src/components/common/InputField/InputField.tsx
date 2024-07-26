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
      {touched && Boolean(error) && <p className={styles.errorText}>{error}</p>}
    </div>
  );
}

export default InputField;
