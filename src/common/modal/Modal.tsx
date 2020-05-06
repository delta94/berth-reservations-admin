import * as React from 'react';
import ReactModal from 'react-modal';
import classNames from 'classnames';

import styles from './modal.module.scss';
import Section from '../section/Section';

interface ModalProps {
  isOpen: boolean;
  label: string;
  toggleModal: (value: boolean) => void;
  className?: string;
}

const Modal: React.FunctionComponent<ModalProps> = ({
  isOpen,
  label,
  children,
  toggleModal,
  className,
}) => {
  const onClose = () => {
    toggleModal(false);
  };
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel={label}
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <Section
        title={label}
        className={classNames(styles.modalContent, className)}
      >
        {children}
      </Section>
    </ReactModal>
  );
};

export default Modal;
