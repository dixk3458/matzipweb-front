import { FaRegTrashAlt } from 'react-icons/fa';
import { colors } from '../../constants';

interface TrashIconProps {
  size?: number;
  color?: string;
}

function TrashIcon({ size = 16, color = colors.BLACK }: TrashIconProps) {
  return <FaRegTrashAlt size={size} color={color} />;
}

export default TrashIcon;
