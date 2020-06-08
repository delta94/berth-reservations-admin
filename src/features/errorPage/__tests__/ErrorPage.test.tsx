import React from 'react';
import { shallow } from 'enzyme';
import { HashRouter } from 'react-router-dom';

import ErrorPage from '../ErrorPage';

describe('ErrorPage', () => {
  it('renders correctly', () => {
    const wrapper = shallow(
      <HashRouter>
        <ErrorPage />
      </HashRouter>
    );
    expect(wrapper.html()).toMatchSnapshot();
  });
});
