import React from 'react';
import { shallow } from 'enzyme';

import CardHeader from '../CardHeader';

const mockProps = {
  title: 'Title',
};

describe('CardHeader', () => {
  const getWrapper = (props = {}) => shallow(<CardHeader {...mockProps} {...props} />);

  it('renders normally', () => {
    const wrapper = getWrapper();

    expect(wrapper.render()).toMatchSnapshot();
  });

  it('renders normally with children', () => {
    const wrapper = getWrapper({
      children: <p>Test</p>,
    });

    expect(wrapper.render()).toMatchSnapshot();
  });
});
