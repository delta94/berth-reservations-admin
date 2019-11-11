import React from 'react';
import { shallow } from 'enzyme';

import ListItem from './ListItem';

describe('ListItem', () => {
  const getWrapper = props => shallow(<ListItem {...props}>one</ListItem>);

  it('should render noramlly', () => {
    expect(getWrapper().html()).toMatchSnapshot();
  });
});
