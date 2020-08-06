import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { MockedProvider } from '@apollo/react-testing';
import { MemoryRouter, Route } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import waitForExpect from 'wait-for-expect';

import ApplicationViewContainer from '../ApplicationViewContainer';
import { INDIVIDUAL_APPLICATION_QUERY } from '../queries';
import LoadingSpinner from '../../../common/spinner/LoadingSpinner';
import { mockApplication, mockBerthSwitch, mockCustomer, mockLease } from '../__fixtures__/mockData';
import ApplicationView from '../ApplicationView';
import {
  INDIVIDUAL_APPLICATION,
  INDIVIDUAL_APPLICATION_berthApplication as BERTH_APPLICATION,
} from '../__generated__/INDIVIDUAL_APPLICATION';

const mockedUseDelete = jest.fn();

jest.mock('../../../common/mutations/deleteBerthApplication', () => ({
  useDeleteBerthApplication: () => mockedUseDelete(),
}));

const fullMockApplication: INDIVIDUAL_APPLICATION = {
  ...mockApplication,
  berthApplication: {
    ...(mockApplication.berthApplication as BERTH_APPLICATION),
    customer: mockCustomer,
    berthSwitch: mockBerthSwitch,
    lease: mockLease,
  },
};

const defaultQueryMock = {
  request: { query: INDIVIDUAL_APPLICATION_QUERY, variables: { id: 'test' } },
  result: {
    data: fullMockApplication,
  },
};

describe('ApplicationViewContainer', () => {
  const getWrapper = (queryMock = defaultQueryMock) => {
    return mount(
      <MockedProvider mocks={[queryMock]}>
        <MemoryRouter initialEntries={['/test']}>
          <Route path="/:id">
            <ApplicationViewContainer />
          </Route>
        </MemoryRouter>
      </MockedProvider>
    );
  };

  const waitForContent = async (wrapper: ReactWrapper) => {
    await act(async () => {
      await waitForExpect(() => {
        wrapper.update();
        expect(wrapper.contains(<LoadingSpinner isLoading={true} />)).toBeFalsy();
      });
    });
  };

  it('renders normally', async () => {
    mockedUseDelete.mockImplementation(() => [jest.fn(), { loading: false }]);
    const wrapper = getWrapper();

    await waitForContent(wrapper);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('renders normally with customer and boatTypes missing', async () => {
    mockedUseDelete.mockImplementation(() => [jest.fn(), { loading: false }]);
    const queryMock = {
      request: { query: INDIVIDUAL_APPLICATION_QUERY, variables: { id: 'test' } },
      result: {
        data: {
          ...mockApplication,
          boatTypes: null,
        },
      },
    };
    const wrapper = getWrapper(queryMock);

    await waitForContent(wrapper);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('when "handleDeleteLease" is called, calls "useDeleteBerthApplication" with expected values', async () => {
    const mockDelete = jest.fn();
    mockedUseDelete.mockImplementation(() => [mockDelete, { loading: false }]);
    const wrapper = getWrapper();

    await waitForContent(wrapper);
    await act(async () => {
      await wrapper.find(ApplicationView).invoke('handleDeleteLease')('0');
      expect(mockDelete).toHaveBeenCalledWith({ variables: { input: { id: '0' } } });
    });
  });
});
