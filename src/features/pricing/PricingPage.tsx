import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './pricingPage.module.scss';
import { EDIT_FORM_TYPE } from './editModal/EditForm';
import PageTitle from '../../common/pageTitle/PageTitle';
import BerthPricing, { BerthPricingProps, BerthPrice } from './berthPricing/BerthPricing';
import WinterStoragePricing, {
  WinterStoragePricingProps,
  WinterStoragePrice,
} from './winterStoragePricing/WinterStoragePricing';
import HarborServicePricing, {
  HarborServicePricingProps,
  HarborService,
} from './harborServicePricing/HarborServicePricing';
import AdditionalServicePricing, {
  AdditionalServicePricingProps,
  AdditionalService,
} from './additionalServicePricing/AdditionalServicePricing';

export interface PricingPageProps {
  berthsData: BerthPricingProps['data'];
  berthsLoading: boolean;
  winterStorageData: WinterStoragePricingProps['data'];
  winterStorageLoading: boolean;
  harborServicesData: HarborServicePricingProps['data'];
  harborServicesLoading: boolean;
  additionalServicesData: AdditionalServicePricingProps['data'];
  additionalServicesLoading: boolean;
  openModal: (
    formType: EDIT_FORM_TYPE,
    initialValues: BerthPrice | WinterStoragePrice | HarborService | AdditionalService
  ) => void;
}

const PricingPage = ({
  berthsData,
  berthsLoading,
  winterStorageData,
  winterStorageLoading,
  harborServicesData,
  harborServicesLoading,
  additionalServicesData,
  additionalServicesLoading,
  openModal,
}: PricingPageProps) => {
  const { t } = useTranslation();

  return (
    <div className={styles.pricingPage}>
      <PageTitle title={t('pricing.title')} />
      <div className={styles.grid}>
        <BerthPricing className={styles.fullWidth} data={berthsData} openModal={openModal} loading={berthsLoading} />
        <WinterStoragePricing
          className={styles.fullWidth}
          data={winterStorageData}
          loading={winterStorageLoading}
          openModal={openModal}
        />
        <HarborServicePricing data={harborServicesData} loading={harborServicesLoading} openModal={openModal} />
        <AdditionalServicePricing
          data={additionalServicesData}
          loading={additionalServicesLoading}
          openModal={openModal}
        />
      </div>
    </div>
  );
};

export default PricingPage;
