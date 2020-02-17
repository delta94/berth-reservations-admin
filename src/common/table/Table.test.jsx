import React from 'react';
import { shallow } from 'enzyme';

import Table from './Table';

const data = [
  { a: 'foobar', b: 'foobar', c: 'foobar' },
  { a: 'foobar', b: 'foobar', c: 'foobar' },
  { a: 'foobar', b: 'foobar', c: 'foobar' },
  { a: 'foobar', b: 'foobar', c: 'foobar' },
  { a: 'foobar', b: 'foobar', c: 'foobar' },
];

const columns = [
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

const initialProps = {
  data,
  columns,
};

describe('Table', () => {
  const getWrapper = (props = {}) =>
    shallow(<Table {...props} {...initialProps} />);

  it('renders normally', () => {
    const wrapper = getWrapper();

    expect(wrapper.html()).toMatchSnapshot();
  });
});
