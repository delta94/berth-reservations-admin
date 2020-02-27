import React from 'react';

import Table, { Column } from './Table';

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

type DataType = { a: string; b: string; c: string };

const columns: Column<DataType>[] = [
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

export const table = () => (
  <Table
    data={MockData}
    columns={columns}
    renderSubComponent={row => {
      return row.index;
    }}
    renderMainHeader={() => 'Demos'}
  />
);

table.story = {
  name: 'Default',
};

export const withSelector = () => (
  <Table
    data={MockData}
    columns={columns}
    renderSubComponent={row => {
      return row.index;
    }}
    renderMainHeader={() => 'Demos'}
    canSelectRows
  />
);

export const withRadioSelector = () => (
  <Table
    data={MockData}
    columns={columns}
    renderSubComponent={row => {
      return row.index;
    }}
    renderMainHeader={() => 'Demos'}
    canSelectOneRow
  />
);
