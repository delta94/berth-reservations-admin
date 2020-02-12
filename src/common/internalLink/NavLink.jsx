import React from 'react';
import { shallow } from 'enzyme';

import Button from './NavLink';

describe('Button', () => {
  const getWrapper = props => shallow(<Button {...props}>Button</Button>);

  test('renders normally', () => {
    const wrapper = getWrapper();

    expect(wrapper.html()).toMatchSnapshot();
  });
});
