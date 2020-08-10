import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { MockedProvider } from '@apollo/react-testing';
import { HashRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import waitForExpect from 'wait-for-expect';

import ApplicationListContainer from '../ApplicationListContainer';
import { BERTH_APPLICATIONS_QUERY } from '../queries';
import { mockData } from '../__fixtures__/mockData';
import ApplicationList from '../ApplicationList';
import LoadingSpinner from '../../../common/spinner/LoadingSpinner';

const mockedUseDelete = jest.fn();

jest.mock('../../../common/mutations/deleteBerthApplication', () => ({
  useDeleteBerthApplication: () => mockedUseDelete(),
}));

const queryMock = {
  request: {
    query: BERTH_APPLICATIONS_QUERY,
    variables: {
      first: 10,
      after: undefined,
      switchApplications: undefined,
      orderBy: undefined,
    },
  },
  result: {
    data: mockData,
  },
};

describe('ApplicationListContainer', () => {
  const getWrapper = () => {
    return mount(
      <MockedProvider mocks={[queryMock]}>
        <HashRouter>
          <ApplicationListContainer />
        </HashRouter>
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

  it('when "handleDeleteLease" is called, calls "useDeleteBerthApplication" with expected values', async () => {
    const mockDelete = jest.fn();
    mockedUseDelete.mockImplementation(() => [mockDelete, { loading: false }]);
    const wrapper = getWrapper();

    await waitForContent(wrapper);
    await act(async () => {
      await wrapper.find(ApplicationList).invoke('handleDeleteLease')('0');
      expect(mockDelete).toHaveBeenCalledWith({ variables: { input: { id: '0' } } });
    });
  });
});
