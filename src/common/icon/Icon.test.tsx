import { shallow } from 'enzyme';
import React from 'react';

import Icon, { IconProps } from './Icon';

describe('common/Icon', () => {
  const defaultProps: IconProps = {
    name: 'helsinkiLogo',
  };
  const getWrapper = (props?: IconProps) => {
    return shallow(<Icon {...defaultProps} {...props} />);
  };

  it('render Icon component', () => {
    const icon = getWrapper();

    expect(icon.html()).toMatchSnapshot();
  });
});
