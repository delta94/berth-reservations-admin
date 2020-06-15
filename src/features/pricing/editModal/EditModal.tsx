import React from 'react';
import { useTranslation } from 'react-i18next';

import Modal from '../../../common/modal/Modal';

export interface EditPricingModalProps {
  isOpen: boolean;
  children: React.ReactNode;
  closeModal(): void;
}

const EditModal = ({ closeModal, isOpen, children }: EditPricingModalProps) => {
  const { t } = useTranslation();

  return (
    <Modal
      isOpen={isOpen}
      label={t('pricing.editModalHeading').toUpperCase()}
      toggleModal={closeModal}
      shouldCloseOnOverlayClick={false}
    >
      {children}
    </Modal>
  );
};

export default EditModal;
