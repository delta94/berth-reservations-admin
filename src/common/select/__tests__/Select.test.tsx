import React from 'react';
import { shallow } from 'enzyme';

import Select, { SelectProps } from '../Select';

const mockProps: SelectProps = {
  label: 'Selector',
  value: '1',
  options: [
    { value: '1', label: 'First' },
    { value: '2', label: 'Second' },
  ],
  onChange: jest.fn(),
};

describe('Select', () => {
  const getWrapper = (props?: Partial<SelectProps>) => shallow(<Select {...mockProps} {...props} />);

  it('renders normally', () => {
    const wrapper = getWrapper();

    expect(wrapper.render()).toMatchSnapshot();
  });

  it('when changed, calls onChange with constructed event containing new value', () => {
    const onChange = jest.fn();
    const wrapper = getWrapper({
      id: 'test',
      onChange: onChange,
    });

    const option = { value: '2', label: 'Second' };

    wrapper.find('Dropdown').simulate('change', option);

    expect(onChange).toHaveBeenCalledWith({ target: { id: 'test', value: '2' } });
  });

  it('does not call onChange if the option has not changed', () => {
    const onChange = jest.fn();
    const wrapper = getWrapper({
      id: 'test',
      onChange: onChange,
      value: '2',
    });

    const option = { value: '2', label: 'Second' };

    wrapper.find('Dropdown').simulate('change', option);

    expect(onChange).not.toHaveBeenCalled();
  });
});
