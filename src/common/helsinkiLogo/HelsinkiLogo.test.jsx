import React from 'react';
import { shallow } from 'enzyme';

import HelsinkiLogo from './HelsinkiLogo';

describe('HelsinkiLogo', () => {
  const getWrapper = props => shallow(<HelsinkiLogo {...props} />).dive();

  it('renders normally', () => {
    const wrapper = getWrapper();

    expect(wrapper.html()).toMatchSnapshot();
  });
});
