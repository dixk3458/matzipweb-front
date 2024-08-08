import { IoHeartOutline } from 'react-icons/io5';

interface HeartIconProps {
  size?: number;
  color?: string;
}

function HeartIcon({ size = 16, color = 'black' }: HeartIconProps) {
  return <IoHeartOutline size={size} color={color} />;
}

export default HeartIcon;
