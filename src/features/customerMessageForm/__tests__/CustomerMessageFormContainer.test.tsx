import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { MockedProvider } from '@apollo/react-testing';
import { act } from 'react-dom/test-utils';
import waitForExpect from 'wait-for-expect';

import CustomerMessageFormContainer, { CustomerMessageFormContainerProps } from '../CustomerMessageFormContainer';
import { mockData } from '../__fixtures__/mockData';
import { NOTIFICATION_TEMPLATES_QUERY } from '../queries';
import LoadingSpinner from '../../../common/spinner/LoadingSpinner';

const mockProps: CustomerMessageFormContainerProps = {
  closeModal: jest.fn(),
  handleSendMessage: jest.fn(),
  selectedCustomerIds: ['0', '1'],
};

const queryMock = {
  request: { query: NOTIFICATION_TEMPLATES_QUERY },
  result: {
    data: mockData,
  },
};

describe('CustomerMessageFormContainer', () => {
  const getWrapper = () =>
    mount(
      <MockedProvider mocks={[queryMock]}>
        <CustomerMessageFormContainer {...mockProps} />
      </MockedProvider>
    );

  const waitForContent = async (wrapper: ReactWrapper) => {
    await act(async () => {
      await waitForExpect(() => {
        wrapper.update();
        expect(wrapper.contains(<LoadingSpinner isLoading={true} />)).toBeFalsy();
      });
    });
  };

  it('renders normally', async () => {
    const wrapper = getWrapper();

    await waitForContent(wrapper);
    expect(wrapper.render()).toMatchSnapshot();
  });
});
