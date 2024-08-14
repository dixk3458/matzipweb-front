import { IoSearchOutline } from 'react-icons/io5';
import { colors } from '../../constants';

interface SearchIconProps {
  size?: number;
  color?: string;
}

function SearchIcon({ size = 16, color = colors.BLACK }: SearchIconProps) {
  return <IoSearchOutline size={size} color={color} />;
}

export default SearchIcon;
