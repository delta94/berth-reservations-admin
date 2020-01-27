import React from 'react';
import { shallow } from 'enzyme';

import Section from './Section';

describe('Section', () => {
  it('renders normally', () => {
    const getWrapper = () => shallow(<Section>Content</Section>);
    const wrapper = getWrapper();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
