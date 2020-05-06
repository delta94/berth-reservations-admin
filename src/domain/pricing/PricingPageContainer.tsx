import React, { FunctionComponent, useState } from 'react';

import placeholderData from './placeholderData';
import PricingPage from './PricingPage';
import EditModal, { EditPricingModalProps } from './editModal/EditModal';

type ModalState =
  | {
      isOpen: false;
    }
  | {
      isOpen: true;
      initialValues: EditPricingModalProps['initialValues'];
      formType: EditPricingModalProps['formType'];
    };

const PricingPageContainer: FunctionComponent = () => {
  const [editModalValues, setEditModalValues] = useState<ModalState>({
    isOpen: false,
  });

  const closeModal = () => {
    setEditModalValues({
      isOpen: false,
    });
  };

  const openModal = (
    formType: EditPricingModalProps['formType'],
    initialValues: EditPricingModalProps['initialValues']
  ) => {
    setEditModalValues({
      isOpen: true,
      formType,
      initialValues,
    });
  };

  return (
    <>
      {editModalValues.isOpen && (
        <EditModal
          {...editModalValues}
          closeModal={closeModal}
          onSubmit={() => alert('Submit')}
        />
      )}
      <PricingPage
        berthsData={placeholderData.berthPrices}
        winterStorageData={placeholderData.winterStoragePrices}
        harborServicesData={placeholderData.harborServices}
        additionalServicesData={placeholderData.additionalServices}
        openModal={openModal}
      />
    </>
  );
};

export default PricingPageContainer;
