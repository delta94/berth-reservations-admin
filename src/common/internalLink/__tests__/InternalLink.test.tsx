import React from 'react';
import { shallow, mount } from 'enzyme';
import { HashRouter, Link } from 'react-router-dom';

import InternalLink, { InternalLinkProps } from '../InternalLink';

describe('InternalLink', () => {
  const getWrapper = (props?: Omit<InternalLinkProps, 'to'>) =>
    shallow(
      <HashRouter>
        <InternalLink to="/" children="Home Page" {...props} />
      </HashRouter>
    );

  it('renders normally', () => {
    const wrapper = getWrapper();

    expect(wrapper.render()).toMatchSnapshot();
  });

  it('renders normally with element children', () => {
    const wrapper = getWrapper({ children: <p>Test!</p> });

    expect(wrapper.render()).toMatchSnapshot();
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
