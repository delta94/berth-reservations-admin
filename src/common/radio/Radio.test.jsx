import React from 'react';
import { shallow } from 'enzyme';

import Radio from './Radio';

describe('Radio', () => {
  const onChange = jest.fn();

  beforeEach(() => {
    jest.restoreAllMocks();
  });

  const initialProps = {
    onChange,
    checked: true,
  };
  const getWrapper = (props = {}) =>
    shallow(<Radio {...initialProps} {...props} />);

  it('renders normally', () => {
    const wrapper = getWrapper();

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('calls onChange when the button is clicked', () => {
    const wrapper = getWrapper();
    const radio = wrapper.find('input');

    radio.simulate('change', { target: { checked: true } });
    expect(initialProps.onChange).toHaveBeenCalledTimes(1);
  });
});
