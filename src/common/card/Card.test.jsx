import { shallow } from 'enzyme';
import React from 'react';

import Card from './Card';

describe('common/Card', () => {
  const DummyHeader = <h1>dummy</h1>;

  const defaultProps = {
    Header: () => DummyHeader,
    width: '100%',
  };
  const getWrapper = props => {
    return shallow(<Card {...defaultProps} {...props} />);
  };

  it('render Card component', () => {
    const card = getWrapper();
    expect(card.html()).toMatchSnapshot();
  });
});
