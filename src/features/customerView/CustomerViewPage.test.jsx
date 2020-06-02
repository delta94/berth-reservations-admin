import React from 'react';
import { shallow } from 'enzyme';

import CustomerViewPage from './CustomerViewPage';

describe('CustomerViewPage', () => {
  const getWrapper = (props = { children: 'Customer view page' }) => shallow(<CustomerViewPage {...props} />);

  it('renders normally', () => {
    const wrapper = getWrapper();

    expect(wrapper.html()).toMatchSnapshot();
  });
});
