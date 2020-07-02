import React from 'react';
import { shallow, mount } from 'enzyme';
import { HashRouter, NavLink } from 'react-router-dom';

import InternalNavLink, { InternalNavLinkProps } from '../InternalNavLink';

describe('InternalNavLink', () => {
  const getWrapper = (props?: Omit<InternalNavLinkProps, 'to'>) =>
    shallow(
      <HashRouter>
        <InternalNavLink to="/" children="Home Page" {...props} />
      </HashRouter>
    );

  it('renders normally', () => {
    const wrapper = getWrapper();

    expect(wrapper.render()).toMatchSnapshot();
  });

  it('renders normally with all props', () => {
    const wrapper = getWrapper({
      color: 'brand',
      icon: <i>Test icon</i>,
      className: 'test',
    });

    expect(wrapper.render()).toMatchSnapshot();
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
