import React from 'react';
import { shallow } from 'enzyme';

import HarborView from '../HarborView';

describe('HarborView', () => {
  const getWrapper = (props = { children: 'Harbor view' }) => shallow(<HarborView {...props} />);

  it('renders normally', () => {
    const wrapper = getWrapper();

    expect(wrapper.html()).toMatchSnapshot();
  });
});
