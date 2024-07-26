import { MouseEvent } from 'react';

interface CustomButtonProps {
  label: string;
  variant?: 'filled' | 'outlined';
  size?: 'small' | 'medium' | 'large';
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

function CustomButton({
  label,
  variant = 'filled',
  size = 'medium',
  onClick,
}: CustomButtonProps) {
  return <button onClick={e => onClick(e)}>{label}</button>;
}

export default CustomButton;
