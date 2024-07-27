import { FaMapLocationDot } from 'react-icons/fa6';

interface MapLocationIconProps {
  size?: number;
  color?: string;
}

function MapLocationIcon({ size = 16, color = 'black' }: MapLocationIconProps) {
  return <FaMapLocationDot size={size} color={color} />;
}

export default MapLocationIcon;
