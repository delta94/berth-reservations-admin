import { shallow } from 'enzyme';
import React from 'react';

import Card from './Card';

describe('common/Card', () => {
  const getWrapper = (props) => {
    return shallow(<Card {...props}>placeholder</Card>);
  };
  it('renders a Card component', () => {
    const card = getWrapper();
    expect(card.html()).toMatchSnapshot();
  });
  it('renders a Card component without title', () => {
    const card = getWrapper();
    expect(card.html()).toMatchSnapshot();
  });
});
