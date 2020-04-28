import React, { FunctionComponent } from 'react';

import Modal from '../../../common/modal/Modal';
import {
  AdditionalService,
  BerthPrice,
  HarborService,
  WinterStoragePrice,
} from '../PricingPage';
import EditBerthPricingForm from './EditBerthPricingForm';

export enum EDIT_PRICING_FORM_TYPES {
  BERTHS = 'BERTHS',
  HARBOR_SERVICES = 'HARBOR_SERVICES',
  WINTER_STORAGE = 'WINTER_STORAGE',
  ADDITIONAL_SERVICES = 'ADDITIONAL_SERVICES',
}

export interface EditPricingModalProps {
  onSubmit: () => void;
  isOpen: boolean;
  closeModal: () => void;
  initialValues:
    | BerthPrice
    | WinterStoragePrice
    | HarborService
    | AdditionalService;
  formType: EDIT_PRICING_FORM_TYPES;
}

/* const renderFormFields = (
  formType: EditPricingModalProps['formType'],
  initialValues: EditPricingModalProps['initialValues']
) => {
  switch (formType) {
    case EDIT_PRICING_FORM_TYPES.ADDITIONAL_SERVICES:
      return (
        <AdditionalServicesPricingFields
          initialValues={initialValues as AdditionalService}
        />
      );
    case EDIT_PRICING_FORM_TYPES.BERTHS:
      return <EditBerthPricingForm initialValues={initialValues as BerthPrice} />;
    case EDIT_PRICING_FORM_TYPES.HARBOR_SERVICES:
      return (
        <HarborServicesPricingFields
          initialValues={initialValues as HarborService}
        />
      );
    case EDIT_PRICING_FORM_TYPES.WINTER_STORAGE:
      return (
        <WinterStoragePricingFields
          initialValues={initialValues as WinterStoragePrice}
        />
      );
    case null:
      return undefined;
  }
}; */

const renderForm = (props: EditPricingModalProps) => {
  const { formType, initialValues, closeModal } = props;
  switch (formType) {
    case EDIT_PRICING_FORM_TYPES.BERTHS:
      return (
        <EditBerthPricingForm
          initialValues={initialValues as BerthPrice}
          closeModal={closeModal}
        />
      );
  }
};

const EditPricingModal: FunctionComponent<EditPricingModalProps> = props => {
  const { isOpen, closeModal } = props;

  return (
    <Modal
      isOpen={isOpen}
      label={'Hinnaston muokkaus'.toUpperCase()}
      toggleModal={closeModal}
    >
      {renderForm(props)}
    </Modal>
  );
};

export default EditPricingModal;
