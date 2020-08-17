import React from 'react';
import { mount } from 'enzyme';

import CustomerListTableTools from '../CustomerListTableTools';
import { SearchBy } from '../../CustomerList';

// CustomerMessageFormContainer is mocked to limit the test scope
jest.mock('../../../customerMessageForm/CustomerMessageFormContainer', () => {
  const CustomerMessageFormContainer = () => <div>CustomerMessageFormContainer</div>;

  return {
    __esModule: true,
    default: CustomerMessageFormContainer,
  };
});

describe('CustomerListTableTools', () => {
  const getWrapper = () =>
    mount(
      <CustomerListTableTools
        searchVal={'test'}
        searchBy={SearchBy.FIRST_NAME}
        searchByOptions={[]}
        setSearchVal={jest.fn}
        setSearchBy={jest.fn}
        selectedCustomerIds={[]}
        clearSelectedRows={jest.fn}
      />
    );

  it('renders normally', () => {
    const wrapper = getWrapper();

    expect(wrapper.render()).toMatchSnapshot();
  });
});
