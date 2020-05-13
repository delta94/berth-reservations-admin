import React from 'react';
import { shallow } from 'enzyme';

import List from './List';

describe('List', () => {
  const getWrapper = (props) =>
    shallow(
      <List {...props}>
        <li>first</li>
        <li>second</li>
      </List>
    );

  it('should render normally', () => {
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

  it('adds a "custom" className when "noBullets" prop is true', () => {
    const wrapper = getWrapper({ noBullets: true });

    expect(wrapper.hasClass('noBullets')).toBe(true);
  });
});
