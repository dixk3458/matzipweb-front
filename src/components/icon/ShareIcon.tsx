import { FaUserFriends } from 'react-icons/fa';

interface ShareIconProps {
  size?: number;
  color?: string;
}

function ShareIcon({ size = 16, color = 'black' }: ShareIconProps) {
  return <FaUserFriends size={size} color={color} />;
}

export default ShareIcon;
