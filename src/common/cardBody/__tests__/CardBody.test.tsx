import React from 'react';
import { shallow } from 'enzyme';

import CardBody from '../CardBody';

describe('CardBody', () => {
  const getWrapper = () => shallow(<CardBody>Test</CardBody>);

  it('renders normally', () => {
    const wrapper = getWrapper();

    expect(wrapper.render()).toMatchSnapshot();
  });
});
