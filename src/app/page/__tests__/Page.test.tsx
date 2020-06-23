import React from 'react';
import { shallow } from 'enzyme';
import { HashRouter } from 'react-router-dom';

import Page from '../Page';

jest.mock('../../../features/auth/hooks', () => ({
  useCurrentUser: jest.fn(() => ({
    name: 'Test User',
    email: 'test@example.com',
  })),
}));

describe('Page', () => {
  const getWrapper = (props = {}) =>
    shallow(
      <HashRouter>
        <Page>Test</Page>
      </HashRouter>
    );

  it('renders normally', () => {
    const wrapper = getWrapper();

    expect(wrapper.render()).toMatchSnapshot();
  });
});
