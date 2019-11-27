import React from 'react';

import CustomerList from './CustomerListComponent';
import { dummyCustomers } from './__mocks__/data'; // placeholder data

const CustomersPageContainer: React.FC = () => {
  return <CustomerList data={dummyCustomers} />;
};

export default CustomersPageContainer;
