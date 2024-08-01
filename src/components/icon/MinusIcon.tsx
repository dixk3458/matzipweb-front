import { FaMinus } from 'react-icons/fa';

interface MinusIconProps {
  size?: number;
  color?: string;
}

function MinusIcon({ size = 16, color = 'black' }: MinusIconProps) {
  return <FaMinus size={size} color={color} />;
}

export default MinusIcon;
