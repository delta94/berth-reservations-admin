import React from 'react';
import { Button } from 'hds-react';

import Modal from '../modal/Modal';
import Text from '../text/Text';
import styles from './confirmationModal.module.scss';

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  infoText: string;
  warningText?: string;
  onCancelText: string;
  onConfirmText: string;
  className?: string;
  onCancel(): void;
  onConfirm(): void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  title,
  infoText,
  warningText,
  onCancelText,
  onConfirmText,
  onCancel,
  onConfirm,
  className,
}) => {
  return (
    <Modal isOpen={isOpen} toggleModal={onCancel} className={className}>
      <Text as="h4" color="brand" className={styles.uppercase}>
        {title}
      </Text>
      <div className={styles.infoTexts}>
        <Text>{infoText}</Text>
        {warningText && (
          <Text as="strong" color="critical" className={styles.warningText}>
            {warningText}
          </Text>
        )}
      </div>
      <div className={styles.actionButtons}>
        <Button variant="secondary" theme="coat" onClick={onCancel} type="button">
          {onCancelText}
        </Button>
        <Button variant="danger" onClick={onConfirm} type="button">
          {onConfirmText}
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
