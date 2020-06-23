import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Notification } from 'hds-react';
import { useTranslation } from 'react-i18next';

import Pricing from './Pricing';
import { PRICING_QUERY } from './queries';
import { PRICING } from './__generated__/PRICING';

const PricingContainer = () => {
  const { t } = useTranslation();

  const { loading, error, data } = useQuery<PRICING>(PRICING_QUERY);

  if (error)
    return (
      <Notification labelText={t('common.notification.error.label')} type="error">
        {t('common.notification.error.description')}
      </Notification>
    );

  return (
    <Pricing
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

export default PricingContainer;
