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

  if (loading) return <LoadingSpinner isLoading={loading} />;
  if (!data) return <div>No data...</div>;
  if (error) return <div>Error</div>;

  const tableData = getCustomersData(data);

  return (
    <CustomersPage>
      <CustomerList data={tableData} />
    </CustomersPage>
  );
};

export default CustomersPageContainer;
