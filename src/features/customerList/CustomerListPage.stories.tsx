import React from 'react';
import { HashRouter } from 'react-router-dom';
import { action } from '@storybook/addon-actions';

import CustomerListPage, { SearchBy } from './CustomerListPage';
import { getCustomersData } from './utils';
import { dummyCustomers } from './__fixtures__/mockData';
import { CustomerListTableToolsProps } from './tableTools/CustomerListTableTools';

export default {
  component: CustomerListPage,
  decorators: [(storyFn: Function) => <HashRouter>{storyFn()}</HashRouter>],
  title: 'CustomerList',
};

const mockTableTools: CustomerListTableToolsProps<SearchBy> = {
  searchVal: '',
  searchBy: SearchBy.ADDRESS,
  setSearchVal: () => action('search val changed'),
  setSearchBy: () => action('search by changed'),
  searchByOptions: [],
};

export const customerList = () => {
  const data = getCustomersData(dummyCustomers);
  return (
    <CustomerListPage
      data={data}
      loading={false}
      pagination={{ pageCount: 1 }}
      tableTools={mockTableTools}
      onSortedColChange={() => action('sort changed')}
      handleSendMessage={() => action('message sent')}
    />
  );
};
