import React from 'react';
import { shallow } from 'enzyme';

import Button from '../Button';

describe('Button', () => {
  const getWrapper = () => shallow(<Button>Test</Button>);

  it('renders normally', () => {
    const wrapper = getWrapper();

    expect(wrapper.render()).toMatchSnapshot();
  });
});
