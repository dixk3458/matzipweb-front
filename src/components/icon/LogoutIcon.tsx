import { IoMdLogOut } from 'react-icons/io';
import { colors } from '../../constants';

interface LogoutIconProps {
  size?: number;
  color?: string;
}

function LogoutIcon({ size = 16, color = colors.BLACK }: LogoutIconProps) {
  return <IoMdLogOut size={size} color={color} />;
}

export default LogoutIcon;
