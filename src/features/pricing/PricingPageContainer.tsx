import React, { FunctionComponent, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Notification } from 'hds-react';
import { useTranslation } from 'react-i18next';

import PricingPage from './PricingPage';
import EditModal, { EditPricingModalProps } from './editModal/EditModal';
import { PRICING_PAGE_QUERY } from './queries';
import { PRICING_PAGE } from './__generated__/PRICING_PAGE';

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
  const { t } = useTranslation();

  const { loading, error, data } = useQuery<PRICING_PAGE>(PRICING_PAGE_QUERY);

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

  if (error)
    return (
      <Notification labelText={t('common.notification.error.label')} type="error">
        {t('common.notification.error.description')}
      </Notification>
    );

  return (
    <>
      {editModalValues.isOpen && (
        <EditModal {...editModalValues} closeModal={closeModal} onSubmit={() => alert('Submit')} />
      )}
      <PricingPage
        berthsData={data?.berthPriceGroups}
        berthsLoading={loading}
        winterStorageData={data?.winterStorageAreas}
        winterStorageLoading={loading}
        harborServicesData={data?.additionalProducts}
        harborServicesLoading={loading}
        additionalServicesData={data?.additionalProducts}
        additionalServicesLoading={loading}
        openModal={openModal}
      />
    </>
  );
};

export default PricingPageContainer;
