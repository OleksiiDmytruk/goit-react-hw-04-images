import { useEffect } from 'react';
import { Overlay, ModalPortal } from './Modal.styled';

export const Modal = ({ url, onClose }) => {
  useEffect(() => {
    window.addEventListener('keydown', onEscape);

    return () => {
      window.removeEventListener('keydown', onEscape);
    };
  });

  const onEscape = evt => {
    if (evt.code === 'Escape') {
      onClose();
    }
  };

  const closeOnBaackdropClick = evt => {
    if (evt.currentTarget === evt.target) {
      onClose();
    }
  };

  return (
    <Overlay onClick={closeOnBaackdropClick}>
      <ModalPortal>
        <img src={url} alt="" />
      </ModalPortal>
    </Overlay>
  );
};
