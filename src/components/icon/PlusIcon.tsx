import { FaPlus } from 'react-icons/fa';

interface PlusIconProps {
  size?: number;
  color?: string;
}

function PlusIcon({ size = 16, color = 'black' }: PlusIconProps) {
  return <FaPlus size={size} color={color} />;
}

export default PlusIcon;
