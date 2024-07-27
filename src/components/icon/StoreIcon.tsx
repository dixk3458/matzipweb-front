import { IoStorefrontSharp } from 'react-icons/io5';

interface StoreIconProps {
  size?: number;
  color?: string;
}

function StoreIcon({ size = 16, color = 'black' }: StoreIconProps) {
  return <IoStorefrontSharp size={size} color={color} />;
}

export default StoreIcon;
