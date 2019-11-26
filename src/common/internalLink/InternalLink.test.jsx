import React from 'react';
import { shallow, mount } from 'enzyme';
import { HashRouter, Link } from 'react-router-dom';

import InternalLink from './InternalLink';

describe('InternalLink', () => {
  const getWrapper = ({ children = 'Home Page', ...props } = {}) =>
    shallow(
      <HashRouter>
        <InternalLink to="/" {...props}>
          {children}
        </InternalLink>
      </HashRouter>
    );

  it('renders normally', () => {
    const wrapper = getWrapper();

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders Link component', () => {
    const wrapper = mount(
      <HashRouter>
        <InternalLink to="/">foo</InternalLink>
      </HashRouter>
    );

    expect(wrapper.find(Link)).toHaveLength(1);
  });
});
