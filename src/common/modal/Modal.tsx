import * as React from 'react';
import ReactModal from 'react-modal';
import classNames from 'classnames';

import styles from './modal.module.scss';
import Text from '../../common/text/Text';

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
      appElement={document.getElementById('root') as HTMLElement}
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel={label}
      className={classNames(styles.modal, className)}
      overlayClassName={styles.overlay}
    >
      <Text as="h4" color="brand">
        {label}
      </Text>
      {children}
    </ReactModal>
  );
};

export default Modal;
