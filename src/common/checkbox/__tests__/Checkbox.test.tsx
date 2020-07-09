import React from 'react';
import { shallow } from 'enzyme';

import Checkbox from '../Checkbox';

const mockProps = {
  id: 'test',
};

describe('Checkbox', () => {
  const getWrapper = (props = {}) => shallow(<Checkbox {...mockProps} {...props} />);

  it('renders normally', () => {
    const wrapper = getWrapper();

    expect(wrapper.render()).toMatchSnapshot();
  });
});
