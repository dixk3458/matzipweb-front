import { IoIosCloseCircle } from 'react-icons/io';

interface XIconProps {
  size?: number;
  color?: string;
}

function XIcon({ size = 16, color = 'black' }: XIconProps) {
  return <IoIosCloseCircle size={size} color={color} />;
}

export default XIcon;
