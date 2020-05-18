import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';
import waitForExpect from 'wait-for-expect';
import { MockedProvider } from '@apollo/react-testing';

import LoadingSpinner from '../../../../../common/spinner/LoadingSpinner';
import HarborEditForm from '../HarborEditForm';
import { HARBOR_FORM_QUERY } from '../queries';
import { UPDATE_HARBOR_MUTATION } from '../mutations';

const queryMock = {
  request: { query: HARBOR_FORM_QUERY, variables: { id: 'a' } },
  result: {
    data: {
      harbor: {
        __typename: 'HarborNode',
        id: 'a',
        properties: {
          __typename: 'HarborProperties',
          name: 'Pajalahden venesatama (Meripuistotie) / Venesatama',
          streetAddress: 'Meripuistotie 1a',
          zipCode: '00210',
          municipality: 'Helsinki',
          wwwUrl: 'https://hel.fi',
          imageFile: 'https://hel.fi',
          maps: [
            {
              __typename: 'HarborMapType',
              id: 'aaa',
              url: 'https://hel.ninja',
            },
          ],
        },
      },
    },
  },
};

describe('HarborEditForm', () => {
  const waitForContent = async (wrapper: ReactWrapper) => {
    await act(async () => {
      await waitForExpect(() => {
        wrapper.update();
        expect(wrapper.contains(<LoadingSpinner isLoading={true} />)).toBeFalsy();
      });
    });
  };

  it('initially renders loading spinner', () => {
    const wrapper = mount(
      <MockedProvider mocks={[queryMock]}>
        <HarborEditForm onCancel={jest.fn()} onSubmit={jest.fn()} harborId="a" />
      </MockedProvider>
    );
    expect(wrapper.contains(<LoadingSpinner isLoading={true} />)).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders content after loading', async () => {
    const wrapper = mount(
      <MockedProvider mocks={[queryMock]}>
        <HarborEditForm onCancel={jest.fn()} onSubmit={jest.fn()} harborId="a" />
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
        query: UPDATE_HARBOR_MUTATION,
        variables: {
          input: {
            id: 'a',
            name: 'Pajalahden venesatama (Meripuistotie) / Venesatama',
            streetAddress: 'Meripuistotie 1a',
            zipCode: '00210',
            municipalityId: 'helsinki',
            wwwUrl: 'https://hel.fi',
          },
        },
      },
      result: () => {
        updateMockCalled = true;
        return {
          data: { updateHarbor: { clientMutationId: '-', __typename: 'ID' } },
        };
      },
    };
    const wrapper = mount(
      // We need queryMock twice here, because MockedProvider requires an
      // instance for each query made and the original query is refetched after updates.
      <MockedProvider mocks={[queryMock, queryMock, updateMock]}>
        <HarborEditForm onCancel={jest.fn()} onSubmit={onUpdateMock} harborId="a" />
      </MockedProvider>
    );
    await waitForContent(wrapper);
    await act(async () => {
      wrapper.find('Form').simulate('submit');
      await waitForExpect(() => {
        wrapper.update();
        expect(onUpdateMock).toBeCalledTimes(1);
        expect(updateMockCalled).toBe(true);
      });
    });
  });
});
