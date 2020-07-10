import React from 'react';
import { shallow } from 'enzyme';

import HelsinkiLogo from '../HelsinkiLogo';

describe('HelsinkiLogo', () => {
  const getWrapper = () => shallow(<HelsinkiLogo />);

  it('renders normally', () => {
    const wrapper = getWrapper();

    expect(wrapper.render()).toMatchSnapshot();
  });
});
