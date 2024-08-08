import { GoBookmarkFill } from 'react-icons/go';

interface BookmarkFillIconProps {
  size?: number;
  color?: string;
}

function BookmarkFillIcon({
  size = 16,
  color = 'black',
}: BookmarkFillIconProps) {
  return <GoBookmarkFill size={size} color={color} />;
}

export default BookmarkFillIcon;
