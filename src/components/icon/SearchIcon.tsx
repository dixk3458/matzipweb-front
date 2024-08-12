import { IoSearchOutline } from 'react-icons/io5';

interface SearchIconProps {
  size?: number;
  color?: string;
}

function SearchIcon({ size = 16, color = 'black' }: SearchIconProps) {
  return <IoSearchOutline size={size} color={color} />;
}

export default SearchIcon;
