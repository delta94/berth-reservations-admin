import React from 'react';
import { shallow } from 'enzyme';

import * as Icons from '../index';

const icons = Object.entries(Icons);

describe('icons', () => {
  test.each(icons)('%p renders normally', (name, Component) => {
    const wrapper = shallow(<Component />);

    expect(wrapper.render()).toBeDefined();
  });
});
