import React from 'react';
import { shallow } from 'enzyme';

import Pagination, { PaginationProps } from '../Pagination';

describe('Pagination', () => {
  const initialProps: PaginationProps = {
    pageCount: 10,
    onPageChange: jest.fn(),
    forcePage: 3,
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  const getWrapper = (props = {}) => shallow(<Pagination {...initialProps} {...props} />);

  it('renders normally', () => {
    const wrapper = getWrapper();

    expect(wrapper.render()).toMatchSnapshot();
  });
});
