import React from 'react';
import { shallow } from 'enzyme';

import SimilarCustomersTable, { SimilarCustomersTableProps } from '../SimilarCustomersTable';
import { SearchBy } from '../../ApplicationView';
import { CustomerGroup } from '../../../../@types/__generated__/globalTypes';

const mockProps: SimilarCustomersTableProps = {
  customersTableTools: {
    className: '',
    searchBy: SearchBy.FIRST_NAME,
    searchByOptions: [],
    searchVal: undefined,
    setSearchBy: jest.fn(),
    handleCreateCustomer: jest.fn(),
    handleLinkCustomer: jest.fn(),
    setSearchVal: jest.fn(),
  },
  data: [],
  handleLinkCustomer: jest.fn(),
  loadingCustomers: false,
  onSortedColChange: jest.fn(),
  pagination: { pageCount: 1 },
};

describe('SimilarCustomersTable', () => {
  const getWrapper = (props?: Partial<SimilarCustomersTableProps>) =>
    shallow(<SimilarCustomersTable {...mockProps} {...props} />);

  it('renders normally with minimum props', () => {
    const wrapper = getWrapper();

    expect(wrapper.render()).toMatchSnapshot();
  });

  it('renders normally with data', () => {
    const wrapper = getWrapper({
      data: [
        {
          address: 'Testiosoite 1',
          berths: null,
          city: 'Helsinki',
          id: '1',
          name: 'Testi Ykkönen',
          customerGroup: null,
        },
        {
          address: 'Testiosoite 2',
          berths: null,
          city: 'Helsinki',
          id: '2',
          name: 'Testi Kakkonen',
          customerGroup: CustomerGroup.COMPANY,
        },
      ],
    });

    expect(wrapper.render()).toMatchSnapshot();
  });
});
