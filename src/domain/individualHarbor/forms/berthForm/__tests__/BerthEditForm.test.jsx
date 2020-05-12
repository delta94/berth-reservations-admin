import React from 'react';
import { mount } from 'enzyme';
import { MockedProvider } from '@apollo/react-testing';
import BerthEditForm from '../BerthEditForm';
import { INDIVIDUAL_BERTH_QUERY } from '../queries';
import { UPDATE_BERTH_MUTATION } from '../mutations';
import LoadingSpinner from '../../../../../common/spinner/LoadingSpinner';
import waitForExpect from 'wait-for-expect';
import { act } from 'react-dom/test-utils';

const pierOptions = [{ id: 'a', identifier: 'A' }];
const queryMock = {
  request: { query: INDIVIDUAL_BERTH_QUERY, variables: { id: 'a' } },
  result: {
    data: {
      berth: {
        number: 2,
        comment: '',
        isActive: true,
        pier: {
          id: pierOptions[0].id,
          properties: {
            identifier: pierOptions[0].identifier,
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
  },
};

describe('domain/individualHarbor/BerthEditForm', () => {
  const waitForContent = async (wrapper) => {
    await act(async () => {
      await waitForExpect(() => {
        wrapper.update();
        expect(
          wrapper.contains(<LoadingSpinner isLoading={true} />)
        ).toBeFalsy();
      });
    });
  };

  it('initially renders loading spinner', () => {
    const wrapper = mount(
      <MockedProvider mocks={[queryMock]}>
        <BerthEditForm berthId="a" pierOptions={pierOptions} />
      </MockedProvider>
    );
    expect(wrapper.contains(<LoadingSpinner isLoading={true} />)).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders content after loading', async () => {
    const wrapper = mount(
      <MockedProvider mocks={[queryMock]}>
        <BerthEditForm berthId="a" pierOptions={pierOptions}/>
      </MockedProvider>
    );
    await waitForContent(wrapper);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('calls update mutation on save', async () => {
    let updateMockCalled = false;
    const onUpdateMock = jest.fn();
    const updateMock = {
      request: {
        query: UPDATE_BERTH_MUTATION,
        variables: {
          input: {
            id: 'a',
            number: 2,
            pierId: pierOptions[0].id,
            width: 2.25,
            length: 5,
            mooringType: 'SINGLE_SLIP_PLACE',
            comment: '',
            isActive: true,
          },
        },
      },
      result: () => {
        updateMockCalled = true;
        return {
          data: { updateBerth: { clientMutationId: '-', __typename: 'ID' } },
        };
      },
    };
    const wrapper = mount(
      // We need queryMock twice here, because MockedProvider requires an
      // instance for each query made and the original query is refetched after updates.
      <MockedProvider mocks={[queryMock, queryMock, updateMock]}>
        <BerthEditForm berthId="a" onSubmit={onUpdateMock} pierOptions={pierOptions}/>
      </MockedProvider>
    );
    await waitForContent(wrapper);
    await act(async () => {
      wrapper.find('form').simulate('submit');
      await waitForExpect(() => {
        wrapper.update();
        expect(onUpdateMock).toBeCalledTimes(1);
        expect(updateMockCalled).toBe(true);
      });
    });
  });
});
