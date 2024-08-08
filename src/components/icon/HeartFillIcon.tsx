import { IoHeartSharp } from 'react-icons/io5';

interface HeartFillIconProps {
  size?: number;
  color?: string;
}

function HeartFillIcon({ size = 16, color = 'black' }: HeartFillIconProps) {
  return <IoHeartSharp size={size} color={color} />;
}

export default HeartFillIcon;
