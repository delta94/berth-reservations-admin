import React, { ChangeEvent, ChangeEventHandler, EventHandler } from 'react';
import { shallow } from 'enzyme';
import { TextInput } from 'hds-react';

import GlobalSearchTableTools from '../GlobalSearchTableTools';

describe('GlobalSearchTableTools', () => {
  const mockProps = {
    handleGlobalFilter: jest.fn(),
  };
  const getWrapper = (props = {}) => shallow(<GlobalSearchTableTools {...mockProps} {...props} />);

  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('renders normally', () => {
    const wrapper = getWrapper();

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should call handleGlobalFilter when onChange is called', () => {
    const handleGlobalFilter = jest.fn();
    const wrapper = getWrapper({ handleGlobalFilter });
    const onChange = wrapper.find(TextInput).prop('onChange') as ChangeEventHandler<HTMLInputElement>;
    const filterValue = 'laudantium aut sapiente';

    onChange({ target: { value: filterValue } } as ChangeEvent<HTMLInputElement>);

    expect(handleGlobalFilter).toHaveBeenNthCalledWith(1, filterValue);
  });

  it('should call handleGlobalFilter with undefined when onChange is called without value', () => {
    const handleGlobalFilter = jest.fn();
    const wrapper = getWrapper({ handleGlobalFilter });
    const onChange = wrapper.find(TextInput).prop('onChange') as ChangeEventHandler<HTMLInputElement>;

    onChange({ target: {} } as ChangeEvent<HTMLInputElement>);

    expect(handleGlobalFilter).toHaveBeenNthCalledWith(1, undefined);
  });
});
