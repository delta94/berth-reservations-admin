import React from 'react';
import { shallow } from 'enzyme';

import Property, { PropertyProps } from '../Property';
import { IconFence } from '../../icons';

describe('Property', () => {
  const getWrapper = (props: PropertyProps) => shallow(<Property {...props} />);

  it('renders normally', () => {
    const wrapper = getWrapper({ icon: IconFence, label: 'Test' });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders normally without icon', () => {
    const wrapper = getWrapper({ label: 'Test' });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders icon with secondary color if active is false', () => {
    const wrapper = getWrapper({ icon: IconFence, active: false, label: 'Test' });

    expect(wrapper.find('IconWrapper').first().prop('color')).toBe('secondary');
  });

  it('renders text without icon with secondary color if active is false', () => {
    const wrapper = getWrapper({ active: false, label: 'Test' });

    expect(wrapper.find('Text').first().prop('color')).toBe('secondary');
  });

  it('renders Text component with strong value for as prop when iconName is not supplied', () => {
    const counter = 9;
    const wrapper = getWrapper({ counter, label: 'Test' });

    expect(wrapper.find('Text').first().prop('as')).toBe('strong');
  });
});
