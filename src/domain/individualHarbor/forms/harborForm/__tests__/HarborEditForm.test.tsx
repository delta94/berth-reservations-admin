import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';
import waitForExpect from 'wait-for-expect';
import { MockedProvider } from '@apollo/react-testing';

import LoadingSpinner from '../../../../../common/spinner/LoadingSpinner';
import HarborEditForm from '../HarborEditForm';
import { HARBOR_FORM_QUERY } from '../queries';

const queryMock = {
  request: { query: HARBOR_FORM_QUERY, variables: { id: 'a' } },
  result: {
    data: {
      harbor: {
        __typename: 'HarborNode',
        id: 'a',
        properties: {
          __typename: 'HarborProperties',
          name: 'Test harbor',
          streetAddress: 'Test Address 1',
          zipCode: '00100',
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
        <HarborEditForm onCancel={jest.fn()} onSubmit={jest.fn()} harborId={'a'} />
      </MockedProvider>
    );
    expect(wrapper.contains(<LoadingSpinner isLoading={true} />)).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders content after loading', async () => {
    const wrapper = mount(
      <MockedProvider mocks={[queryMock]}>
        <HarborEditForm onCancel={jest.fn()} onSubmit={jest.fn()} harborId={'a'} />
      </MockedProvider>
    );
    await waitForContent(wrapper);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
