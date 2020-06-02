import React from 'react';
import { shallow } from 'enzyme';

import HarborViewPage from './HarborViewPage';

describe('HarborViewPage', () => {
  const getWrapper = (props = { children: 'Harbor view page' }) => shallow(<HarborViewPage {...props} />);

  it('renders normally', () => {
    const wrapper = getWrapper();

    expect(wrapper.html()).toMatchSnapshot();
  });
});
