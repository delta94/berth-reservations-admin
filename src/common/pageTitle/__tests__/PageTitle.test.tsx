import React from 'react';
import { shallow } from 'enzyme';

import PageTitle from '../PageTitle';

describe('PageTitle', () => {
  it('renders normally', () => {
    const wrapper = shallow(<PageTitle title="test" />);

    expect(wrapper.render()).toMatchSnapshot();
  });
});
