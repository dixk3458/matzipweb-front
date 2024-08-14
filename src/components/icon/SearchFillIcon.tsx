import { FaSearch } from 'react-icons/fa';
import { colors } from '../../constants';

interface SearchFillIconProps {
  size?: number;
  color?: string;
}

function SearchFillIcon({
  size = 16,
  color = colors.BLACK,
}: SearchFillIconProps) {
  return <FaSearch size={size} color={color} />;
}

export default SearchFillIcon;
