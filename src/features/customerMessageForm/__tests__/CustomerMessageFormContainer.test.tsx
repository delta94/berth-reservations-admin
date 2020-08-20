import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { MockedProvider } from '@apollo/react-testing';
import { act } from 'react-dom/test-utils';
import waitForExpect from 'wait-for-expect';

import CustomerMessageFormContainer, { CustomerMessageFormContainerProps } from '../CustomerMessageFormContainer';
import { mockData, mockHtml } from '../__fixtures__/mockData';
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

  it('handlePreview and handleCancelPreview should work as expected', async () => {
    const wrapper = getWrapper();

    await waitForContent(wrapper);
    expect(wrapper.find('CustomerMessageForm').prop('previewHtml')).toEqual(undefined);

    act(() => {
      const handlePreview = wrapper.find('CustomerMessageForm').prop('handlePreview') as Function;
      handlePreview('Tm90aWZpY2F0aW9uVGVtcGxhdGVOb2RlOjE=');
    });
    wrapper.update();
    expect(wrapper.find('CustomerMessageForm').prop('previewHtml')).toEqual(mockHtml);

    act(() => {
      const handleCancelPreview = wrapper.find('CustomerMessageForm').prop('handleCancelPreview') as Function;
      handleCancelPreview();
    });
    wrapper.update();
    expect(wrapper.find('CustomerMessageForm').prop('previewHtml')).toEqual(undefined);
  });

  it('handlePreview should set "previewHtml" as undefined if template preview does not exist', async () => {
    const wrapper = getWrapper();

    await waitForContent(wrapper);
    expect(wrapper.find('CustomerMessageForm').prop('previewHtml')).toEqual(undefined);

    act(() => {
      const handlePreview = wrapper.find('CustomerMessageForm').prop('handlePreview') as Function;
      handlePreview('SPAM-AD');
    });
    wrapper.update();
    expect(wrapper.find('CustomerMessageForm').prop('previewHtml')).toEqual(undefined);
  });
});
