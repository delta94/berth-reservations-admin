import React from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/react-hooks';
import { Notification } from 'hds-react';

import { HARBORS_QUERY } from './harborsQuery';
import { getHarborsData } from './utils';
import { HARBORS } from './__generated__/HARBORS';
import HarborsPage from './HarborsPage';
import { HarborData } from './types';

const HarborsContainer: React.FC = () => {
  const { t } = useTranslation();
  const { loading, error, data } = useQuery<HARBORS>(HARBORS_QUERY);

  if (error)
    return (
      <Notification labelText={t('common.notification.error.label')} type="error">
        {t('common.notification.error.description')}
      </Notification>
    );

  const tableData: HarborData[] = getHarborsData(data);

  return <HarborsPage data={tableData} loading={loading} />;
};

export default HarborsContainer;
