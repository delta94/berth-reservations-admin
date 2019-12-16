import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { CUSTOMER_QUERY } from './queries';
import { getCustomersData } from './utils';
import { CUSTOMERS } from './__generated__/CUSTOMERS';
import CustomerList from './CustomerListComponent';

const CustomersPageContainer: React.FC = () => {
  const { loading, error, data } = useQuery<CUSTOMERS>(CUSTOMER_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const tableData: [any] = getCustomersData(data);

  return <CustomerList data={tableData} />;
};

export default CustomersPageContainer;
