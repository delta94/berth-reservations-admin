import React from 'react';
import { shallow } from 'enzyme';

import Property, { PropertyProps } from '../Property';
import Text from '../../text/Text';
import { IconFence } from '../../icons';

describe('Property', () => {
  const getWrapper = (props: PropertyProps) => shallow(<Property {...props} />);

  it('renders normally', () => {
    const wrapper = getWrapper({ icon: IconFence, label: 'Test' });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders Text component with strong value for as prop when iconName is not supplied', () => {
    const counter = 9;
    const wrapper = getWrapper({ counter, label: 'Test' });

    expect(wrapper.find(Text).first().prop('as')).toBe('strong');
  });
});
