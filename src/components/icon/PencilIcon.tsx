import { FaPencilAlt } from "react-icons/fa";

interface PencilIconProps {
    size?: number;
    color?: string;
  }
  
  function PencilIcon({ size = 16, color = 'black' }: PencilIconProps) {
    return <FaPencilAlt size={size} color={color} />;
  }
  
  export default PencilIcon;
  