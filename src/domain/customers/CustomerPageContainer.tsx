import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import LoadingSpinner from '../../common/spinner/LoadingSpinner';
import { CUSTOMER_QUERY } from './queries';
import { getCustomersData } from './utils';
import { CUSTOMERS } from './__generated__/CUSTOMERS';
import CustomerList from './CustomerListComponent';
import CustomersPage from './CustomersPage';

const CustomersPageContainer: React.FC = () => {
  const { loading, error, data } = useQuery<CUSTOMERS>(CUSTOMER_QUERY);
  if (error)
    return (
      <CustomersPage>
        <p>Error</p>
      </CustomersPage>
    );

  const tableData = getCustomersData(data);

  return (
    <CustomersPage>
      <LoadingSpinner isLoading={loading}>
        <CustomerList data={tableData} />
      </LoadingSpinner>
    </CustomersPage>
  );
};

export default CustomersPageContainer;
