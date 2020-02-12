import React from 'react';
import { shallow, mount } from 'enzyme';
import { HashRouter, Link } from 'react-router-dom';

import NavLink from './NavLink';

describe('InternalLink', () => {
  const getWrapper = ({ children = 'Home Page', ...props } = {}) =>
    shallow(
      <HashRouter>
        <NavLink to="/" {...props}>
          {children}
        </NavLink>
      </HashRouter>
    );

  it('renders normally', () => {
    const wrapper = getWrapper();

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders Link component', () => {
    const wrapper = mount(
      <HashRouter>
        <NavLink to="/">foo</NavLink>
      </HashRouter>
    );

    expect(wrapper.find(Link)).toHaveLength(1);
  });
});
