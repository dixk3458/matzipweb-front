import { MouseEvent, ReactNode } from 'react';

import styles from './Modal.module.css';

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

function Modal({ children, onClose }: ModalProps) {
  const handleClickClose = (event: MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <section className={styles.container} onClick={e => handleClickClose(e)}>
      <button className={styles.button} onClick={() => onClose()}>
        X
      </button>
      {children}
    </section>
  );
}

export default Modal;
