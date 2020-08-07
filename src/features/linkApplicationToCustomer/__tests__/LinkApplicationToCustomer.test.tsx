import React, { ChangeEvent, ChangeEventHandler } from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

import LinkApplicationToCustomer, { LinkApplicationToCustomerProps } from '../LinkApplicationToCustomer';
import { SearchBy } from '../../applicationView/ApplicationView';
import { CustomerGroup } from '../../../@types/__generated__/globalTypes';

const mockProps: LinkApplicationToCustomerProps = {
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

const mockData: LinkApplicationToCustomerProps['data'] = [
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
    berths: 'Testisatama',
    city: 'Helsinki',
    id: '2',
    name: 'Testi Kakkonen',
    customerGroup: CustomerGroup.COMPANY,
  },
];

describe('LinkApplicationToCustomer', () => {
  const getWrapper = (props?: Partial<LinkApplicationToCustomerProps>) =>
    mount(<LinkApplicationToCustomer {...mockProps} {...props} />);

  it('renders normally with minimum props', () => {
    const wrapper = getWrapper();

    expect(wrapper.render()).toMatchSnapshot();
  });

  it('renders normally with data', () => {
    const wrapper = getWrapper({
      data: mockData,
    });

    expect(wrapper.render()).toMatchSnapshot();
  });

  it('if no row is selected, CustomersTableTools prop handleLinkCustomer is undefined', () => {
    const wrapper = getWrapper({
      data: mockData,
    });

    expect(wrapper.find('CustomersTableTools').prop('handleLinkCustomer')).toEqual(undefined);
  });

  it('if a row is selected, CustomersTableTools prop handleLinkCustomer is set', async () => {
    const handleLinkCustomer = jest.fn();
    const wrapper = getWrapper({
      handleLinkCustomer,
      data: mockData,
    });

    const onChange = wrapper.find('input#radio-1').prop('onChange') as ChangeEventHandler<HTMLInputElement>;
    await act(async () => {
      await onChange({ target: {} } as ChangeEvent<HTMLInputElement>);
    });
    wrapper.update();
    expect(wrapper.find('input#radio-1').prop('checked')).toEqual(true);

    wrapper.find('CustomersTableTools').find('Button').at(0).simulate('click');
    expect(handleLinkCustomer).toHaveBeenCalledWith('1');
  });
});
