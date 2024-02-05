import React  from 'react';
import './Modal.css';

interface ModalProps {
  isOpen: boolean;
  children?: React.ReactNode;
  isClosed: () => void;
  mode: 'create' | 'edit';
}

function Modal(props: ModalProps) {
  const handleClose = () => {
    props.isClosed();
  };

  if (!props.isOpen) return null;

  return (
    <div className='container'>
      <div className='modal-container'>
        <div className='modal-content'>
          <div>
            {props.children}
          </div>
          <button type='button' className='btn-modal' onClick={handleClose}>
            X
          </button>
        </div>
      </div>
    </div>
  );
}
export default Modal;
