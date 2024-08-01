import { FaLocationCrosshairs } from 'react-icons/fa6';

interface LocationIconProps {
  size?: number;
  color?: string;
}

function LocationIcon({ size = 16, color = 'black' }: LocationIconProps) {
  return <FaLocationCrosshairs size={size} color={color} />;
}

export default LocationIcon;
