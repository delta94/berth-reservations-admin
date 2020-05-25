import React from 'react';
import { shallow } from 'enzyme';
import TableTools from '../TableTools';
import { SearchBy } from '../../CustomerListComponent';

describe('TableTools', () => {
  const getWrapper = () =>
    shallow(
      <TableTools
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
