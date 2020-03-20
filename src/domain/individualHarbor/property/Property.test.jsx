import React from 'react';
import { shallow } from 'enzyme';

import Property from './Property';
import Text from '../../../common/text/Text';

describe('Property', () => {
  const getWrapper = (props = { iconName: 'fence', label: 'Test' }) =>
    shallow(<Property {...props} />);

  it('renders normally', () => {
    const wrapper = getWrapper();

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders Text component with strong value for as prop when iconName is not supplied', () => {
    const counter = 9;
    const wrapper = getWrapper({ counter });

    expect(
      wrapper
        .find(Text)
        .first()
        .prop('as')
    ).toBe('strong');
  });
});
