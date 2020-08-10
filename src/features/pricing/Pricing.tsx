import React from 'react';
import { useTranslation } from 'react-i18next';
import { PureQueryOptions } from 'apollo-client';

import styles from './pricing.module.scss';
import PageTitle from '../../common/pageTitle/PageTitle';
import BerthPricing, { BerthPricingProps } from './berthPricing/BerthPricing';
import WinterStoragePricing, { WinterStoragePricingProps } from './winterStoragePricing/WinterStoragePricing';
import HarborServicePricing, { HarborServicePricingProps } from './harborServicePricing/HarborServicePricing';
import AdditionalServicePricing, {
  AdditionalServicePricingProps,
} from './additionalServicePricing/AdditionalServicePricing';
import PageContent from '../../common/pageContent/PageContent';

export interface PricingProps {
  berthsData: BerthPricingProps['data'];
  winterStorageData: WinterStoragePricingProps['data'];
  harborServicesData: HarborServicePricingProps['data'];
  additionalServicesData: AdditionalServicePricingProps['data'];
  loading: boolean;
  refetchQueries?: PureQueryOptions[] | string[];
}

const Pricing = ({
  berthsData,
  winterStorageData,
  harborServicesData,
  additionalServicesData,
  loading,
  refetchQueries,
}: PricingProps) => {
  const { t } = useTranslation();

  return (
    <PageContent className={styles.pricing}>
      <PageTitle title={t('pricing.title')} />
      <div className={styles.grid}>
        <BerthPricing
          className={styles.fullWidth}
          data={berthsData}
          loading={loading}
          refetchQueries={refetchQueries}
        />
        <WinterStoragePricing className={styles.fullWidth} data={winterStorageData} loading={loading} />
        <HarborServicePricing data={harborServicesData} loading={loading} />
        <AdditionalServicePricing data={additionalServicesData} loading={loading} />
      </div>
    </PageContent>
  );
};

export default Pricing;
