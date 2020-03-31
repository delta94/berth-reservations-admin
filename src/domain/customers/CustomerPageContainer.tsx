import React from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/react-hooks';
import { Notification } from 'hds-react';

import LoadingSpinner from '../../common/spinner/LoadingSpinner';
import { CUSTOMER_QUERY } from './queries';
import { getCustomersData } from './utils';
import { CUSTOMERS } from './__generated__/CUSTOMERS';
import CustomerList from './CustomerListComponent';
import CustomersPage from './CustomersPage';

const CustomersPageContainer: React.FC = () => {
  const { t } = useTranslation();
  const { loading, error, data } = useQuery<CUSTOMERS>(CUSTOMER_QUERY);

  if (loading) return <LoadingSpinner isLoading={loading} />;
  if (!data)
    return (
      <Notification labelText={t('common.notification.noData.label')}>
        {t('common.notification.noData.description')}
      </Notification>
    );
  if (error)
    return (
      <Notification
        labelText={t('common.notification.error.label')}
        type="error"
      >
        {t('common.notification.error.description')}
      </Notification>
    );

  const tableData = getCustomersData(data);

  return (
    <CustomersPage>
      <CustomerList data={tableData} />
    </CustomersPage>
  );
};

export default CustomersPageContainer;
