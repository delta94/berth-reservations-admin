import React from 'react';
import { shallow } from 'enzyme';

import List from './List';

describe('List', () => {
  const getWrapper = props =>
    shallow(
      <List {...props}>
        <li>first</li>
        <li>second</li>
      </List>
    );

  it('shouold render noramlly', () => {
    const wrapper = getWrapper();

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders a "ul" element by default', () => {
    const wrapper = getWrapper();

    expect(wrapper.find('ul')).toHaveLength(1);
  });

  it('renders a "ol" element when ordered prop is true', () => {
    const wrapper = getWrapper({ ordered: true });

    expect(wrapper.find('ol')).toHaveLength(1);
  });

  it('adds a "custom" className when "custom" prop is true', () => {
    const wrapper = getWrapper({ custom: true });

    expect(wrapper.hasClass('custom')).toBe(true);
  });
});
