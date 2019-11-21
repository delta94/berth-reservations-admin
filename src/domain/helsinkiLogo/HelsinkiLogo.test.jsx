import React from 'react';
import { shallow } from 'enzyme';
import { HashRouter } from 'react-router-dom';

import HelsinkiLogo from './HelsinkiLogo';

describe('HelsinkiLogo', () => {
  const getWrapper = props =>
    shallow(
      <HashRouter>
        <HelsinkiLogo {...props} />
      </HashRouter>
    ).dive();

  it('renders normally', () => {
    const wrapper = getWrapper();

    expect(wrapper.html()).toMatchSnapshot();
  });
});
