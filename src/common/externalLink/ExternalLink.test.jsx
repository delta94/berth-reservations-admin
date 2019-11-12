import React from 'react';
import { shallow } from 'enzyme';

import ExternalLink from './ExternalLink';

describe('ExternalLink', () => {
  const getWrapper = props => shallow(<ExternalLink {...props} />);

  it('renders normally', () => {
    const wrapper = getWrapper({ children: 'test' });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
