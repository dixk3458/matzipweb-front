import { IoMdSettings } from 'react-icons/io';
import { colors } from '../../constants';

interface SettingIconProps {
  size?: number;
  color?: string;
}

function SettingIcon({ size = 16, color = colors.BLACK }: SettingIconProps) {
  return <IoMdSettings size={size} color={color} />;
}

export default SettingIcon;
