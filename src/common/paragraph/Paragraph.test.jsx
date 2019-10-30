import React from 'react';
import { shallow } from 'enzyme';

import Paragraph from './Paragraph';

describe('Paragraph', () => {
  it('renders normally', () => {
    const getWrapper = () => shallow(<Paragraph>Content</Paragraph>);
    const wrapper = getWrapper();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
