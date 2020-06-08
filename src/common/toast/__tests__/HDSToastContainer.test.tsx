import React, { useState } from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { wait } from '@apollo/react-testing';
import { act } from 'react-dom/test-utils';

import hdsToast from '../hdsToast';
import HDSToastContainer from '../HDSToastContainer';

describe('HDSToastContainer', () => {
  const TestComponent: React.FC = () => {
    const [count, setCount] = useState(0);
    return (
      <div>
        <HDSToastContainer />
        <button
          id="toastBtn"
          onClick={() => {
            hdsToast({ type: 'error', labelText: 'labelText', text: 'text', toastId: `toast-${count}` });
            setCount(count + 1);
          }}
        />
      </div>
    );
  };

  const getWrapper = () => {
    return mount(<TestComponent />);
  };

  const simulateToast = async (wrapper: ReactWrapper) => {
    wrapper.find('#toastBtn').simulate('click');
    await act(async () => await wait(100));
    wrapper.update();
  };

  const simulateCloseToast = async (wrapper: ReactWrapper, toastId: number) => {
    wrapper.find(`#toast-${toastId}`).find('button[title="common.closeToast"]').simulate('click');
    await act(async () => await wait(1500));
    wrapper.update();
  };

  it('adds toasts to the container when hdsToast is called', async () => {
    const wrapper = getWrapper();
    await simulateToast(wrapper);
    expect(wrapper.find('#toast-0')).toHaveLength(1);
    expect(wrapper.find('.Toastify__toast')).toHaveLength(1);
  });

  it('supports multiple simultaneous toasts', async () => {
    const wrapper = getWrapper();
    await simulateToast(wrapper);
    await simulateToast(wrapper);
    expect(wrapper.find('#toast-0')).toHaveLength(1);
    expect(wrapper.find('#toast-1')).toHaveLength(1);
    expect(wrapper.find('.Toastify__toast')).toHaveLength(2);
  });

  it('closes toast when the notifications close button is clicked', async () => {
    const wrapper = getWrapper();
    await simulateToast(wrapper);
    expect(wrapper.find('#toast-0')).toHaveLength(1);
    await simulateCloseToast(wrapper, 0);
    expect(wrapper.find('#toast-0')).toHaveLength(0);
    expect(wrapper.find('.Toastify__toast')).toHaveLength(0);
  });
});
