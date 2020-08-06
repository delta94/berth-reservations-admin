import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { MockedProvider } from '@apollo/react-testing';
import { HashRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import waitForExpect from 'wait-for-expect';

import SimilarCustomersTableContainer, { SimilarCustomersTableContainerProps } from '../SimilarCustomersTableContainer';
import LoadingSpinner from '../../../../common/spinner/LoadingSpinner';

const mockProps: SimilarCustomersTableContainerProps = {
  berthApplication: {
    address: 'Testikatu 1',
    email: 'test@example.com',
    firstName: 'Testi',
    id: '1',
    lastName: 'Käyttäjä',
    municipality: 'Helsinki',
    phoneNumber: '0500000000',
    zipCode: '00100',
  },
};

describe('SimilarCustomersTableContainer', () => {
  const getWrapper = (props?: Partial<SimilarCustomersTableContainerProps>) =>
    mount(
      <MockedProvider>
        <HashRouter>
          <SimilarCustomersTableContainer {...mockProps} {...props} />
        </HashRouter>
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
