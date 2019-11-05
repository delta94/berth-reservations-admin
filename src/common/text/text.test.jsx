import React from 'react';
import { shallow } from 'enzyme';

import Text from './Text';

describe('Text', () => {
  const getWrapper = props => shallow(<Text {...props} />);

  it('renders noramlly', () => {
    const wrapper = getWrapper({ children: 'test' });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render "h1" if the supplied "as" prop is "h1"', () => {
    const wrapper = getWrapper({ as: 'h1', children: 'test' });
    expect(wrapper.find('h1')).toHaveLength(1);
  });

  it('should add the supplied color prop as a className', () => {
    const color = 'primary';
    const wrapper = getWrapper({ children: 'test', color });
    expect(wrapper.hasClass(color)).toBe(true);
  });

  it('should add the supplied size prop as a className', () => {
    const size = 'xl';
    const wrapper = getWrapper({ children: 'test', size });
    expect(wrapper.hasClass(size)).toBe(true);
  });

  it('should add bold as a className if the supplied bold prop is true', () => {
    const wrapper = getWrapper({ bold: true, children: 'test' });
    expect(wrapper.hasClass('bold')).toBe(true);
  });

  it('should add italic as a className if the supplied italic prop is true', () => {
    const wrapper = getWrapper({ children: 'test', italic: true });
    expect(wrapper.hasClass('italic')).toBe(true);
  });
});
