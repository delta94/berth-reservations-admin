import React from 'react';
import { shallow } from 'enzyme';

import IndividualHarborPage from './IndividualHarborPage';

describe('IndividualHarborPage', () => {
  const getWrapper = (props = { children: 'Individual Harbor Page' }) => shallow(<IndividualHarborPage {...props} />);

  it('renders normally', () => {
    const wrapper = getWrapper();

    expect(wrapper.html()).toMatchSnapshot();
  });
});
