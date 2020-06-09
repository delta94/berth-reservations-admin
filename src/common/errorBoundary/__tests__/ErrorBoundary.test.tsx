import React from 'react';
import { mount } from 'enzyme';

import ErrorBoundary from '../ErrorBoundary';

describe('ErrorBoundary', () => {
  it('renders children', () => {
    const wrapper = mount(
      <ErrorBoundary errorComponent={<div>error</div>}>
        <div>no error</div>
      </ErrorBoundary>
    );
    expect(wrapper.text()).toEqual('no error');
  });

  it('renders errorComponent when child throws', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {
      /* no-op: silence the thrown error message to not pollute the test output */
    });

    const ThrowingComponent: React.FC = () => {
      throw Error('error');
    };

    const wrapper = mount(
      <ErrorBoundary errorComponent={<div>error</div>}>
        <ThrowingComponent />
      </ErrorBoundary>
    );
    expect(wrapper.text()).toEqual('error');
  });
});
