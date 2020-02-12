import React from 'react';
import { shallow } from 'enzyme';

import Chip from './Chip';

describe('Chip', () => {
  const getWrapper = (props = { label: 'Foo', color: 'red' }) =>
    shallow(<Chip {...props} />);

  it('renders normally', () => {
    const wrapper = getWrapper();

    expect(wrapper.html()).toMatchSnapshot();
  });
});
