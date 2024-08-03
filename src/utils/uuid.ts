import { v4 as uuidv4 } from 'uuid';

function createId() {
  return uuidv4();
}

export default createId;
