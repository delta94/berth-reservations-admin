import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Notification } from 'hds-react';
import { useQuery } from '@apollo/react-hooks';

import { CUSTOMER_QUERY } from './queries';
import { getCustomersData } from './utils';
import { CUSTOMERS, CUSTOMERSVariables as CUSTOMERS_VARS } from './__generated__/CUSTOMERS';
import CustomerList, { ORDER_BY } from './CustomerListComponent';
import CustomersPage from './CustomersPage';
import { usePagination } from '../../common/utils/usePagination';

const CustomersPageContainer: React.FC = () => {
  const { t } = useTranslation();
  const [orderBy, setOrderBy] = useState<ORDER_BY>();

  const { cursor, pageSize, pageIndex, getPageCount, goToPage } = usePagination();

  const customersVars: CUSTOMERS_VARS = { after: cursor, first: pageSize, orderBy };
  const { loading, error, data } = useQuery<CUSTOMERS, CUSTOMERS_VARS>(CUSTOMER_QUERY, {
    variables: customersVars,
  });

  if (error)
    return (
      <Notification labelText={t('common.notification.error.label')} type="error">
        {t('common.notification.error.description')}
      </Notification>
    );

  const tableData = getCustomersData(data);

  return (
    <CustomersPage>
      <CustomerList
        loading={loading}
        data={tableData}
        pagination={{
          forcePage: pageIndex,
          pageCount: getPageCount(data?.profiles?.count),
          onPageChange: ({ selected }) => goToPage(selected),
        }}
        setOrderBy={setOrderBy}
      />
    </CustomersPage>
  );
};

export default CustomersPageContainer;
