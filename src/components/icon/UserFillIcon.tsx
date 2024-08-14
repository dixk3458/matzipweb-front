import { FaUserCircle } from 'react-icons/fa';
import { colors } from '../../constants';

interface UserFillIconProps {
  size?: number;
  color?: string;
}

function UserFillIcon({ size = 16, color = colors.BLACK }: UserFillIconProps) {
  return <FaUserCircle size={size} color={color} />;
}

export default UserFillIcon;
