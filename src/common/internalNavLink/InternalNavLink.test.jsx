import React from 'react';
import { shallow, mount } from 'enzyme';
import { HashRouter, NavLink } from 'react-router-dom';

import InternalNavLink from './InternalNavLink';

describe('InternalNavLink', () => {
  const getWrapper = ({ children = 'Home Page', ...props } = {}) =>
    shallow(
      <HashRouter>
        <InternalNavLink to="/" {...props}>
          {children}
        </InternalNavLink>
      </HashRouter>
    );

  it('renders normally', () => {
    const wrapper = getWrapper();

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders NavLink component', () => {
    const wrapper = mount(
      <HashRouter>
        <InternalNavLink to="/">foo</InternalNavLink>
      </HashRouter>
    );

    expect(wrapper.find(NavLink)).toHaveLength(1);
  });
});
