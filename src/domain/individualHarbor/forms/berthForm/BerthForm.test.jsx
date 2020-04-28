import React from 'react';
import { mount } from 'enzyme';
import { MockedProvider, wait } from '@apollo/react-testing';
import BerthForm from './BerthForm';
import { INDIVIDUAL_BERTH_QUERY } from './queries';
import { DELETE_BERTH_MUTATION, UPDATE_BERTH_MUTATION } from './mutations';
import LoadingSpinner from '../../../../common/spinner/LoadingSpinner';
import { INDIVIDUAL_HARBOR_QUERY } from '../../queries';
import waitForExpect from "wait-for-expect";

describe('domain/individualHarbor/BerthForm', () => {
  const queryMock = {
    request: { query: INDIVIDUAL_BERTH_QUERY },
    result: {
      berth: {
        number: 2,
        comment: '',
        isActive: true,
        pier: {
          id: '-',
          properties: {
            identifier: '-',
            __typename: 'PierProperties',
          },
          __typename: 'PierNode',
        },
        mooringType: 'SINGLE_SLIP_PLACE',
        width: 2.25,
        length: 5,
        depth: null,
        __typename: 'BerthNode',
      },
    },
  };

  it('initially renders loading spinner', () => {
    const wrapper = mount(
      <MockedProvider mocks={[queryMock]}>
        <BerthForm berthId="a" />
      </MockedProvider>
    );
    expect(wrapper.contains(<LoadingSpinner isLoading={true} />)).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders content after loading', async () => {
    const wrapper = mount(
        <MockedProvider mocks={[queryMock]}>
          <BerthForm berthId="a" />
        </MockedProvider>
    );
    await waitForExpect(() => {
      expect(wrapper.contains(<LoadingSpinner isLoading={true} />)).toBeFalsy();
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('calls update mutation on save', () => {
    let updateMockCalled = false;
    const updateMock = {
      request: { query: UPDATE_BERTH_MUTATION, variables: { id: 'a' } },
      result: () => {
        updateMockCalled = true;
        return { clientMutationId: '-' };
      },
    };
    const wrapper = mount(
      <MockedProvider mocks={[queryMock, updateMock]}>
        <BerthForm berthId="a" />
      </MockedProvider>
    );

    wrapper.find('button').at(2).simulate('click');
    expect(updateMockCalled).toBe(true);
  });

  it('calls delete mutation on delete', () => {
    let deleteMockCalled = false;
    const deleteMock = {
      request: { query: DELETE_BERTH_MUTATION, variables: { id: 'a' } },
      result: () => {
        deleteMockCalled = true;
        return { clientMutationId: '-' };
      },
    };
    const wrapper = mount(
      <MockedProvider mocks={[queryMock, deleteMock]}>
        <BerthForm berthId="a" />
      </MockedProvider>
    );

    wrapper.find('button').at(1).simulate('click');
    expect(deleteMockCalled).toBe(true);
  });

  it('calls BerthForm refetchQueries on update and delete', () => {
    const onUpdateMock = jest.fn();
    const onDeleteMock = jest.fn();
    const onCancelMock = jest.fn();
    let passedRefetchQueryMockCall = jest.fn();
    const refetchQuery = {
      request: { query: INDIVIDUAL_HARBOR_QUERY, variables: { id: 'a' } },
      result: () => {
        passedRefetchQueryMockCall.call(this);
        return {};
      },
    };
    const wrapper = mount(
      <MockedProvider mocks={[queryMock]}>
        <BerthForm
          berthId="a"
          refetchQueries={[refetchQuery]}
          onUpdate={onUpdateMock}
          onDelete={onDeleteMock}
          onCancel={onCancelMock}
        />
      </MockedProvider>
    );

    wrapper.find('button').at(0).simulate('click');
    expect(passedRefetchQueryMockCall).toBeCalledTimes(0);
    expect(onCancelMock).toBeCalledTimes(1);

    wrapper.find('button').at(1).simulate('click');
    expect(passedRefetchQueryMockCall).toBeCalledTimes(2);
    expect(onDeleteMock).toBeCalledTimes(1);

    wrapper.find('button').at(2).simulate('click');
    expect(passedRefetchQueryMockCall).toBeCalledTimes(1);
    expect(onUpdateMock).toBeCalledTimes(1);
  });
});
