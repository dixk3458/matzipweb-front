import { MouseEvent, ReactNode } from 'react';
import styles from './CustomButton.module.css';

interface CustomButtonProps {
  label?: string;
  icon?: ReactNode;
  variant?: 'filled' | 'outlined';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

function CustomButton({
  label,
  icon,
  variant = 'filled',
  size = 'medium',
  disabled = false,
  onClick,
}: CustomButtonProps) {
  return (
    <button
      disabled={disabled}
      className={`${styles.container} ${styles[variant]} ${styles[size]} ${
        disabled && styles.disabled
      }`}
      onClick={e => onClick(e)}
    >
      {icon && icon}
      {label && <p className={styles.buttonText}>{label}</p>}
    </button>
  );
}

export default CustomButton;
