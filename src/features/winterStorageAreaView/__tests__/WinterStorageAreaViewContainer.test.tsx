import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import { MockedProvider, wait } from '@apollo/react-testing';
import { Route, MemoryRouter } from 'react-router-dom';

import WinterStorageAreaViewContainer from '../WinterStorageAreaViewContainer';
import { INDIVIDUAL_WINTER_STORAGE_AREA_QUERY } from '../queries';
import { mockData } from '../__fixtures__/mockData';

const queryMock = {
  request: { query: INDIVIDUAL_WINTER_STORAGE_AREA_QUERY, variables: { id: 'test' } },
  result: { data: mockData },
};

describe('WinterStorageAreaViewContainer', () => {
  it('renders correctly', async () => {
    const wrapper = mount(
      <MockedProvider mocks={[queryMock]}>
        <MemoryRouter initialEntries={['/test']}>
          <Route path="/:id">
            <WinterStorageAreaViewContainer />
          </Route>
        </MemoryRouter>
      </MockedProvider>
    );
    await act(async () => await wait(1));
    wrapper.update();
    expect(wrapper.render()).toMatchSnapshot();
  });
});
