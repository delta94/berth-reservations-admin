import React from 'react';
import ReactModal from 'react-modal';
import classNames from 'classnames';

import styles from './modal.module.scss';
import Text from '../../common/text/Text';

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  label?: string;
  toggleModal?: (value: boolean) => void;
  className?: string;
  shouldCloseOnOverlayClick?: boolean;
}

const Modal = ({ isOpen, label, children, toggleModal, className, shouldCloseOnOverlayClick = true }: ModalProps) => {
  const onClose = () => {
    toggleModal?.(false);
  };
  return (
    <ReactModal
      appElement={document.getElementById('root') as HTMLElement}
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel={label}
      className={classNames(styles.modal, className)}
      overlayClassName={styles.overlay}
      shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
    >
      {label && (
        <Text as="h4" color="brand">
          {label}
        </Text>
      )}
      {children}
    </ReactModal>
  );
};

export default Modal;
