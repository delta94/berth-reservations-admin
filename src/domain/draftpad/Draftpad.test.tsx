import React from 'react';
import { shallow } from 'enzyme';

import App from './App';

describe('App', () => {
  const getWrapper = () => shallow(<App />);

  it('renders without crashing', () => {
    const wrapper = getWrapper();
    expect(wrapper.find('div').html()).toMatchSnapshot();
  });
});
