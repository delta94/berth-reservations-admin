import React from 'react';
import { shallow } from 'enzyme';

import LabelValuePair, { LabelValuePairProps } from '../LabelValuePair';

describe('LabelValuePair', () => {
  const getWrapper = (props?: LabelValuePairProps) => shallow(<LabelValuePair label="foo" value="bar" {...props} />);

  it('renders normally', () => {
    const wrapper = getWrapper();

    expect(wrapper.render()).toMatchSnapshot();
  });

  it('renders normally with all props', () => {
    const wrapper = getWrapper({
      label: 'test',
      value: 'example',
      labelColor: 'brand',
      valueColor: 'secondary',
      align: 'right',
    });

    expect(wrapper.render()).toMatchSnapshot();
  });
});
