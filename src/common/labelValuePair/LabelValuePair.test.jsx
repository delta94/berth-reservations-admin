import React from 'react';
import { shallow } from 'enzyme';

import LabelValuePair from './LabelValuePair';

describe('LabelValuePair', () => {
  const getWrapper = () => shallow(<LabelValuePair label="foo" value="bar" />);

  it('renders normally', () => {
    const wrapper = getWrapper();

    expect(wrapper.html()).toMatchSnapshot();
  });
});
