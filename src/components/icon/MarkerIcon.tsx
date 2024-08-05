import { HiOutlineLocationMarker } from 'react-icons/hi';
import { colors } from '../../constants';

interface MarkerIconProps {
  size?: number;
  color?: keyof typeof colors;
}

function MarkerIcon({ size = 16, color = 'RED' }: MarkerIconProps) {
  return <HiOutlineLocationMarker size={size} color={colors[color]} />;
}

export default MarkerIcon;
