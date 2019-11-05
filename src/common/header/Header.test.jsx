import { shallow } from 'enzyme';
import React from 'react';

import Header from './Header';
describe('common/Header', () => {
  it('renders a Header component', () => {

    const dummyProps = {
      brand: <h3>Asiakastiedot</h3>
    }

    const getWrapper = props => {
      return shallow(<Header {...dummyProps}></Header>);
    };
    const card = getWrapper();
    expect(card.html()).toMatchSnapshot();
  });
});
