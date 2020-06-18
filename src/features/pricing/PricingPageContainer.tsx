import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Notification } from 'hds-react';
import { useTranslation } from 'react-i18next';

import PricingPage from './PricingPage';
import { PRICING_PAGE_QUERY } from './queries';
import { PRICING_PAGE } from './__generated__/PRICING_PAGE';

const PricingPageContainer = () => {
  const { t } = useTranslation();

  const { loading, error, data } = useQuery<PRICING_PAGE>(PRICING_PAGE_QUERY);

  if (error)
    return (
      <Notification labelText={t('common.notification.error.label')} type="error">
        {t('common.notification.error.description')}
      </Notification>
    );

  return (
    <PricingPage
      berthsData={data?.berthPriceGroups}
      berthsLoading={loading}
      winterStorageData={data?.winterStorageAreas}
      winterStorageLoading={loading}
      harborServicesData={data?.additionalProducts}
      harborServicesLoading={loading}
      additionalServicesData={data?.optionalProducts}
      additionalServicesLoading={loading}
    />
  );
};

export default PricingPageContainer;
