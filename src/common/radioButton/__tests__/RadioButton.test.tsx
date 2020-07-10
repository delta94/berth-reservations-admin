import React from 'react';
import { shallow } from 'enzyme';

import RadioButton from '../RadioButton';

const mockProps = {
  id: 'test',
};

describe('RadioButton', () => {
  const getWrapper = (props = {}) => shallow(<RadioButton {...mockProps} {...props} />);

  it('renders normally', () => {
    const wrapper = getWrapper();

    expect(wrapper.render()).toMatchSnapshot();
  });
});
