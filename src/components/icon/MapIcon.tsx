import { FaRegMap } from 'react-icons/fa';
import { colors } from '../../constants';

interface MapIconProps {
  size?: number;
  color?: string;
}

function MapIcon({ size = 16, color = colors.BLACK }: MapIconProps) {
  return <FaRegMap size={size} color={color} />;
}

export default MapIcon;
