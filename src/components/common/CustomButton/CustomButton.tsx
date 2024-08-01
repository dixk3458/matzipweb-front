import { MouseEvent, ReactNode } from 'react';
import styles from './CustomButton.module.css';

interface CustomButtonProps {
  label?: string;
  icon?: ReactNode;
  variant?: 'filled' | 'outlined';
  size?: 'small' | 'medium' | 'large';
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

function CustomButton({
  label,
  icon,
  variant = 'filled',
  size = 'medium',
  onClick,
}: CustomButtonProps) {
  return (
    <button
      className={`${styles.container} ${styles[variant]} ${styles[size]}`}
      onClick={e => onClick(e)}
    >
      {icon && icon}
      {label && <p className={styles.buttonText}>{label}</p>}
    </button>
  );
}

export default CustomButton;
