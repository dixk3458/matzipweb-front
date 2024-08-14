import { FaMap } from 'react-icons/fa';
import { colors } from '../../constants';

interface MapFillIconProps {
  size?: number;
  color?: string;
}

function MapFillIcon({ size = 16, color = colors.BLACK }: MapFillIconProps) {
  return <FaMap size={size} color={color} />;
}

export default MapFillIcon;
