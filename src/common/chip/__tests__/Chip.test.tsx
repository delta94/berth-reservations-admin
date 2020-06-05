import React from 'react';
import { shallow } from 'enzyme';

import Chip, { ChipProps } from '../Chip';

describe('Chip', () => {
  const getWrapper = (props: ChipProps = { label: 'Foo', color: 'red' }) => shallow(<Chip {...props} />);

  it('renders normally', () => {
    const wrapper = getWrapper();

    expect(wrapper.render()).toMatchSnapshot();
  });
});
