import { IoHeartSharp } from 'react-icons/io5';
import { colors } from '../../constants';

interface HeartFillIconProps {
  size?: number;
  color?: string;
}

function HeartFillIcon({ size = 16, color = colors.RED }: HeartFillIconProps) {
  return <IoHeartSharp size={size} color={color} />;
}

export default HeartFillIcon;
