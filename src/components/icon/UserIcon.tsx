import { FaRegUserCircle } from 'react-icons/fa';
import { colors } from '../../constants';

interface UserIconProps {
  size?: number;
  color?: string;
}

function UserIcon({ size = 16, color = colors.BLACK }: UserIconProps) {
  return <FaRegUserCircle size={size} color={color} />;
}

export default UserIcon;
