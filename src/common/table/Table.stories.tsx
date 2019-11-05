import React from 'react';

import Table from './Table';

export default {
  component: Table,
  title: 'Table',
};

const MOUNTAINS = [
  { name: 'Kilimanjaro', height: 5895, country: 'Tanzania' },
  { name: 'Everest', height: 8848, country: 'Nepal' },
  { name: 'Mount Fuji', height: 3776, country: 'Japan' },
  { name: 'Mont Blanc', height: 4808, country: 'Italy/France' },
  { name: 'Vaalserberg', height: 323, country: 'Netherlands' },
  { name: 'Denali', height: 6168, country: 'United States' },
  { name: 'Popocatepetl', height: 5465, country: 'Mexico' },
];

const columns: any[] = [
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
