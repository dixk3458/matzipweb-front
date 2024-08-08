import { CiBookmark } from 'react-icons/ci';

interface BookmarkIconProps {
  size?: number;
  color?: string;
}

function BookmarkIcon({ size = 16, color = 'black' }: BookmarkIconProps) {
  return <CiBookmark size={size} color={color} />;
}

export default BookmarkIcon;
