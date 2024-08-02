import { ChangeEvent, ReactNode } from 'react';
import styles from './InputField.module.css';

interface InputFieldProps {
  type: 'text' | 'password';
  value: string;
  placeholder?: string;
  touched?: boolean;
  error?: string;
  disabled?: boolean;
  icon?: ReactNode;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
}

function InputField({
  type,
  value,
  placeholder,
  touched,
  error,
  disabled = false,
  icon,
  onChange,
  onBlur,
}: InputFieldProps) {
  return (
    <div
      className={`${styles.container} ${
        touched && error && styles.errorContainer
      }`}
    >
      {icon}
      <div className={styles.inputContainer}>
        <input
          disabled={disabled}
          className={styles.input}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={e => onChange && onChange(e)}
          onBlur={() => onBlur && onBlur()}
        />
        {touched && Boolean(error) && (
          <p className={styles.errorText}>{error}</p>
        )}
      </div>
    </div>
  );
}

export default InputField;
