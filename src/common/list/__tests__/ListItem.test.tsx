import React from 'react';
import { shallow } from 'enzyme';

import ListItem from '../ListItem';

describe('ListItem', () => {
  const getWrapper = () => shallow(<ListItem>one</ListItem>);

  it('should render normally', () => {
    expect(getWrapper().render()).toMatchSnapshot();
  });
});
