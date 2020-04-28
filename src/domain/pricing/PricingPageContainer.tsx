import React, { FunctionComponent, useState } from 'react';

import placeholderData from './placeholderData';
import PricingPage from './PricingPage';
import EditPricingModal, {
  EDIT_PRICING_FORM_TYPES,
  EditPricingModalProps,
} from './modals/EditPricingModal';

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
        <EditPricingModal
          {...editModalValues}
          closeModal={closeModal}
          onSubmit={() => alert('Submit')}
        />
      )}
      <ol>
        <li>
          <button
            onClick={() =>
              openModal(
                EDIT_PRICING_FORM_TYPES.BERTHS,
                placeholderData.berthPrices[0]
              )
            }
          >
            Berths!
          </button>
        </li>
        <li>
          <button
            onClick={() =>
              openModal(
                EDIT_PRICING_FORM_TYPES.WINTER_STORAGE,
                placeholderData.winterStoragePrices[0]
              )
            }
          >
            Winter storage!
          </button>
        </li>
        <li>
          <button
            onClick={() =>
              openModal(
                EDIT_PRICING_FORM_TYPES.HARBOR_SERVICES,
                placeholderData.harborServices[0]
              )
            }
          >
            Harbor services!
          </button>
        </li>
        <li>
          <button
            onClick={() =>
              openModal(
                EDIT_PRICING_FORM_TYPES.ADDITIONAL_SERVICES,
                placeholderData.additionalServices[0]
              )
            }
          >
            Additional services!
          </button>
        </li>
      </ol>
      <PricingPage
        harborData={placeholderData.berthPrices}
        winterStorageData={placeholderData.winterStoragePrices}
        harborServices={placeholderData.harborServices}
        otherServices={placeholderData.additionalServices}
      />
    </>
  );
};

export default PricingPageContainer;
