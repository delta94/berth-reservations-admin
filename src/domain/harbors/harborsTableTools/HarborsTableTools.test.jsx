import React from 'react';
import { shallow } from 'enzyme';
import { TextInput } from 'hds-react';

import HarborsTableTools from './HarborsTableTools';

describe('HarborsTableTools', () => {
  const mockProps = {
    handleGlobalFilter: jest.fn(),
  };
  const getWrapper = (props = {}) =>
    shallow(<HarborsTableTools {...mockProps} {...props} />);

  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('renders normally', () => {
    const wrapper = getWrapper();

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should call handleGlobalFilter when onChange is called', () => {
    const onChange = getWrapper()
      .find(TextInput)
      .prop('onChange');
    const filterValue = 'laudantium aut sapiente';

    onChange({ target: { value: filterValue } });

    expect(mockProps.handleGlobalFilter).toHaveBeenNthCalledWith(
      1,
      filterValue
    );
  });
});
