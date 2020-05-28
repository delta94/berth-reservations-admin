import React from 'react';
import { mount } from 'enzyme';

import CustomerListTableTools from '../CustomerListTableTools';
import { SearchBy } from '../../CustomerListComponent';

describe('CustomerListTableTools', () => {
  const getWrapper = () =>
    mount(
      <CustomerListTableTools
        searchVal={'test'}
        searchBy={SearchBy.FIRST_NAME}
        searchByOptions={[]}
        setSearchVal={jest.fn}
        setSearchBy={jest.fn}
        handleSendMessage={jest.fn}
      />
    );

  it('renders normally', () => {
    const wrapper = getWrapper();

    expect(wrapper.html()).toMatchSnapshot();
  });
});
