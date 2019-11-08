/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import Table from './Table';

export default {
  component: Table,
  title: 'Table',
};

const MockData = [
  { a: 'foobar', b: 'foobar', c: 'foobar' },
  { a: 'foobar', b: 'foobar', c: 'foobar' },
  { a: 'foobar', b: 'foobar', c: 'foobar' },
  { a: 'foobar', b: 'foobar', c: 'foobar' },
  { a: 'foobar', b: 'foobar', c: 'foobar' },
];

const columns: any[] = [
  {
    Header: 'name',
    accessor: 'a',
  },
  {
    Header: 'height',
    accessor: 'b',
  },
  {
    Header: 'country',
    accessor: 'c',
  },
];

export const Simple = () => (
  <Table
    data={MockData}
    columns={columns}
    renderSubComponent={row => row.index}
    renderMainHeader={() => 'Demos'}
    canSelectRows
  />
);
