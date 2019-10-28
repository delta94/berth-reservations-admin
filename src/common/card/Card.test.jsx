import { shallow } from 'enzyme';
import React from 'react';

import Card from './Card';

describe('common/Card', () => {
  it('renders a Card component', () => {
    const getWrapper = props => {
      return shallow(<Card title="placeholder" {...props} />);
    };
    const card = getWrapper();
    expect(card.html()).toMatchSnapshot();
  });
  it('renders a Card component without title', () => {
    const getWrapper = props => {
      return shallow(<Card {...props} />);
    };
    const card = getWrapper();
    expect(card.html()).toMatchSnapshot();
  });
});
