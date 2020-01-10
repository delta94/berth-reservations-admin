import React from 'react';

import CustomerListComponent from './CustomerListComponent';
import { getCustomersData } from './utils';
import dummyCustomers from './__mocks__/data.json';

export default {
  component: CustomerListComponent,
  title: 'CustomerList',
};

export const customerList = () => {
  const data = getCustomersData(dummyCustomers);
  return <CustomerListComponent data={data} />;
};
