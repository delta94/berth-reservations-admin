import { shallow } from 'enzyme';
import React from 'react';

import Icon from './Icon';

describe('common/Icon', () => {
  const defaultProps = {
    name: 'fence',
  };
  const getWrapper = props => {
    return shallow(<Icon {...defaultProps} {...props} />);
  };

  it('render Icon component', () => {
    const icon = getWrapper();

    expect(icon.html()).toMatchSnapshot();
  });
});
