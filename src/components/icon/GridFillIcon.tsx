import { BsGrid3X3GapFill } from 'react-icons/bs';

interface GridFillIconProps {
  size?: number;
  color?: string;
}

function GridFillIcon({ size = 16, color = 'black' }: GridFillIconProps) {
  return <BsGrid3X3GapFill size={size} color={color} />;
}

export default GridFillIcon;
