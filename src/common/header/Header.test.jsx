import { shallow } from 'enzyme';
import React from 'react';

import Header from './Header';

describe('common/Header', () => {
  const getWrapper = () => {
    return shallow(<Header>dummy</Header>);
  };

  it('render Header component', () => {
    const header = getWrapper();
    expect(header.html()).toMatchSnapshot();
  });
});
