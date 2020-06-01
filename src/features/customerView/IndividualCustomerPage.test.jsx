import React from 'react';
import { shallow } from 'enzyme';

import IndividualCustomerPage from './IndividualCustomerPage';

describe('IndividualCustomerPage', () => {
  const getWrapper = (props = { children: 'Individual Customer Page' }) =>
    shallow(<IndividualCustomerPage {...props} />);

  it('renders normally', () => {
    const wrapper = getWrapper();

    expect(wrapper.html()).toMatchSnapshot();
  });
});
