import React from 'react';
import { HashRouter } from 'react-router-dom';

import CustomerListComponent from './CustomerListComponent';
import CustomerListPage from './CustomerListPage';
import { getCustomersData } from './utils';
import dummyCustomers from './__mocks__/data.json';

export default {
  component: CustomerListComponent,
  decorators: [(storyFn) => <HashRouter>{storyFn()}</HashRouter>],
  title: 'CustomerList',
};

export const customerList = () => {
  const data = getCustomersData(dummyCustomers);
  return (
    <CustomerListPage>
      <CustomerListComponent data={data} />
    </CustomerListPage>
  );
};
