import React from 'react';
import { useTranslation } from 'react-i18next';

import Modal from '../../../common/modal/Modal';
import EditForm, { EDIT_FORM_TYPE } from './EditForm';
import { AdditionalService } from '../additionalServicePricing/AdditionalServicePricing';
import { HarborService } from '../harborServicePricing/HarborServicePricing';
import { WinterStoragePrice } from '../winterStoragePricing/WinterStoragePricing';
import { BerthPrice } from '../berthPricing/BerthPricing';

export interface EditPricingModalProps {
  closeModal: () => void;
  formType: EDIT_FORM_TYPE;
  initialValues: BerthPrice | WinterStoragePrice | HarborService | AdditionalService;
  isOpen: boolean;
  onSubmit: (values: BerthPrice | WinterStoragePrice | HarborService | AdditionalService) => void;
}

const EditModal = ({ closeModal, formType, initialValues, isOpen, onSubmit }: EditPricingModalProps) => {
  const { t } = useTranslation();

  return (
    <Modal
      isOpen={isOpen}
      label={t('pricing.editModalHeading').toUpperCase()}
      toggleModal={closeModal}
      shouldCloseOnOverlayClick={false}
    >
      <EditForm closeModal={closeModal} formType={formType} initialValues={initialValues} onSubmit={onSubmit} />
    </Modal>
  );
};

export default EditModal;
