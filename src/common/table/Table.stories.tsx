import React from 'react';

import Table from './Table';

export default {
  component: Table,
  title: 'Table',
};

const MOUNTAINS = [
  { country: 'Tanzania', height: 5895, name: 'Kilimanjaro' },
  { country: 'Nepal', height: 8848, name: 'Everest' },
  { country: 'Japan', height: 3776, name: 'Mount Fuji' },
  { country: 'Italy/France', height: 4808, name: 'Mont Blanc' },
  { country: 'Netherlands', height: 323, name: 'Vaalserberg' },
  { country: 'United States', height: 6168, name: 'Denali' },
  { country: 'Mexico', height: 5465, name: 'Popocatepetl' },
];

const columns: object[] = [
  {
    Header: 'name',
    accessor: 'name',
  },
  {
    Header: 'height',
    accessor: 'height',
  },
  {
    Header: 'country',
    accessor: 'country',
  },
];

export const Simple = () => (
  <Table
    data={MOUNTAINS}
    columns={columns}
    renderSubComponent={row => row.index}
    renderMainHeader={() => 'Demos'}
    canSelectRows
  />
);
