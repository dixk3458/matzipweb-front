import { BsGrid3X3 } from 'react-icons/bs';

interface GridIconProps {
  size?: number;
  color?: string;
}

function GridIcon({ size = 16, color = 'black' }: GridIconProps) {
  return <BsGrid3X3 size={size} color={color} />;
}

export default GridIcon;
