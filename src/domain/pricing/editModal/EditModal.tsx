import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';

import Modal from '../../../common/modal/Modal';
import {
  AdditionalService,
  BerthPrice,
  HarborService,
  WinterStoragePrice,
} from '../PricingPage';
import EditForm from './EditForm';
import { PRICING_TYPES } from './fields/EditFormFields';

export interface EditPricingModalProps {
  closeModal: () => void;
  formType: PRICING_TYPES;
  initialValues:
    | BerthPrice
    | WinterStoragePrice
    | HarborService
    | AdditionalService;
  isOpen: boolean;
  onSubmit: (
    values: BerthPrice | WinterStoragePrice | HarborService | AdditionalService
  ) => void;
}

const EditModal: FunctionComponent<EditPricingModalProps> = ({
  closeModal,
  formType,
  initialValues,
  isOpen,
  onSubmit,
}) => {
  const { t } = useTranslation();

  return (
    <Modal
      isOpen={isOpen}
      label={t('pricing.editModalHeading').toUpperCase()}
      toggleModal={closeModal}
      shouldCloseOnOverlayClick={false}
    >
      <EditForm
        closeModal={closeModal}
        formType={formType}
        initialValues={initialValues}
        onSubmit={onSubmit}
      />
    </Modal>
  );
};

export default EditModal;
