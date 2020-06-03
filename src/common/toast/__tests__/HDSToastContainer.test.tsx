import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { wait } from '@apollo/react-testing';
import { act } from 'react-dom/test-utils';

import hdsToast from '../hdsToast';
import HDSToastContainer from '../HDSToastContainer';

describe('HDSToastContainer', () => {
  const getWrapper = () => {
    return mount(
      <div>
        <HDSToastContainer />
        <button id="toastBtn" onClick={() => hdsToast({ type: 'error', labelText: 'labelText', text: 'text' })} />
      </div>
    );
  };

  const simulateToast = async (wrapper: ReactWrapper) => {
    wrapper.find('#toastBtn').simulate('click');
    await act(async () => await wait(10));
  };

  it('adds toasts to the container when hdsToast is called', async () => {
    const wrapper = getWrapper();
    // TODO: assert number of toasts == 0
    await simulateToast(wrapper);
    // TODO: Assert number of toasts == 1
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('supports multiple simultaneous toasts', async () => {
    const wrapper = getWrapper();
    await simulateToast(wrapper);
    await simulateToast(wrapper);
    // TODO: assert number of toasts == 2
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('closes toast when the notifications close button is clicked', async () => {
    const wrapper = getWrapper();
    await simulateToast(wrapper);
    // TODO: assert number of toasts == 1
    // TODO: click to close first toast and await
    // TODO: assert number of toasts == 0
    expect(wrapper.html()).toMatchSnapshot();
  });
});
