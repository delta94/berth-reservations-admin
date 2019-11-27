import React from 'react';

import CustomerListComponent from './CustomerListComponent';
import { dummyCustomers } from './__mocks__/data';

export default {
  component: CustomerListComponent,
  title: 'CustomerList',
};

export const customerList = () => (
  <CustomerListComponent data={dummyCustomers} />
);
