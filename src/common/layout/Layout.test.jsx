import React from 'react';
import { shallow } from 'enzyme';

import Layout from './Layout';

describe('Layout', () => {
  const getWrapper = () => shallow(<Layout />);

  it('renders normally', () => {
    const wrapper = getWrapper();

    expect(wrapper.html()).toMatchSnapshot();
  });
});
