import React from 'react';
import { shallow } from 'enzyme';

import CustomerView from './CustomerView';

describe('CustomerView', () => {
  const getWrapper = (props = { children: 'Customer view' }) => shallow(<CustomerView {...props} />);

  it('renders normally', () => {
    const wrapper = getWrapper();

    expect(wrapper.html()).toMatchSnapshot();
  });
});
