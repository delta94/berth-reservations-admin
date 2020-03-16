import React from 'react';
import { shallow } from 'enzyme';

import TableHeader from './TableHeader';

describe('TableHeader', () => {
  const handleSetFilter = jest.fn();
  const initialProps = { filters: ['A', 'B'], handleSetFilter };

  const getWrapper = (props = {}) =>
    shallow(<TableHeader {...initialProps} {...props} />);

  beforeEach(() => {
    handleSetFilter.mockRestore();
  });

  it('renders normally', () => {
    const wrapper = getWrapper();

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should call handleSetFilters with undefined when the first button is clicked', () => {
    const firstBtn = getWrapper()
      .find('button')
      .first();

    firstBtn.simulate('click');

    expect(handleSetFilter).toHaveBeenNthCalledWith(1);
  });

  it("should call handleSetFilters with the filter's value when a filter button is clicked", () => {
    const filters = ['foo', 'bar'];
    const fooFilter = filters[0];

    const buttons = getWrapper({ filters }).find('button');
    const firstFilterBtn = buttons
      .findWhere(node => node.text().includes(fooFilter))
      .first();

    firstFilterBtn.simulate('click');

    expect(handleSetFilter).toHaveBeenNthCalledWith(1, fooFilter);
  });
});
