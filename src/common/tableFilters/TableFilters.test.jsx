import React from 'react';
import { shallow } from 'enzyme';

import TableFilters from './TableFilters';

describe('TableFilters', () => {
  const handleSetFilter = jest.fn();
  const initialProps = {
    filters: [
      {
        label: 'A',
        value: 'A',
      },
      {
        label: 'B',
        value: 'B',
      },
    ],
    handleSetFilter,
  };

  const getWrapper = (props = {}) => shallow(<TableFilters {...initialProps} {...props} />);

  beforeEach(() => {
    handleSetFilter.mockRestore();
  });

  it('renders normally', () => {
    const wrapper = getWrapper();

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should call handleSetFilters with undefined when the first button is clicked', () => {
    const firstBtn = getWrapper().find('button').first();

    firstBtn.simulate('click');

    expect(handleSetFilter).toHaveBeenNthCalledWith(1);
  });

  it("should call handleSetFilters with the filter's value when a filter button is clicked", () => {
    const filters = [
      {
        label: 'Foo',
        value: 'Foo',
      },
      {
        label: 'Bar',
        value: 'Bar',
      },
    ];
    const fooFilterValue = filters[0].value;
    const buttons = getWrapper({ filters }).find('button');
    const firstFilterBtn = buttons.findWhere((node) => node.text().includes(fooFilterValue)).first();

    firstFilterBtn.simulate('click');

    expect(handleSetFilter).toHaveBeenNthCalledWith(1, fooFilterValue);
  });

  it('filter button should be disabled for disabled filters', () => {
    const filters = [
      {
        label: 'Foo',
        value: 'Foo',
        disabled: true,
      },
    ];
    const filterValue = filters[0].value;
    const buttons = getWrapper({ filters }).find('button');
    const filterBtn = buttons.findWhere((node) => node.text().includes(filterValue)).first();

    expect(filterBtn.prop('disabled')).toBe(true);
  });
});
