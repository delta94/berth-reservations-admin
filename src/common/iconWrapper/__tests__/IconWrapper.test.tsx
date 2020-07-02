import React from 'react';
import { shallow } from 'enzyme';

import IconWrapper from '../IconWrapper';
import { IconBoat } from '../../icons';

const mockProps = {
  icon: () => null,
};

describe('IconWrapper', () => {
  const getWrapper = (props = {}) => shallow(<IconWrapper {...mockProps} {...props} />);

  it('renders normally with minimum props', () => {
    const wrapper = getWrapper();

    expect(wrapper.render()).toMatchSnapshot();
  });

  it('renders normally with all props', () => {
    const wrapper = getWrapper({
      className: 'test',
      outlined: true,
      icon: IconBoat,
      color: 'brand',
      size: 'l',
    });

    expect(wrapper.render()).toMatchSnapshot();
  });
});
