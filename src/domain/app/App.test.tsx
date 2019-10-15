import React from 'react';
import App from './App';
import { shallow } from 'enzyme';

describe('App', () => {
  const getWrapper = () => shallow(<App />);

  it('renders without crashing', () => {
    const wrapper = getWrapper();
    expect(wrapper.find('div').html()).toMatchSnapshot();
  });
});
