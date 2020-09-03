import React from 'react';
import { shallow } from 'enzyme';

import CustomerView, { CustomerViewProps } from '../CustomerView';
import { privateCustomerProfile } from '../../../common/privateCustomerDetails/__fixtures__/mockData';

const mockProps: CustomerViewProps = {
  applications: [],
  bills: [],
  boats: [],
  customerProfile: privateCustomerProfile,
  leases: [],
  openBills: [],
  setBoatToEdit: jest.fn(),
  setOpenBill: jest.fn(),
  onClickCreateBoat: jest.fn(),
};

describe('CustomerView', () => {
  const getWrapper = (props?: Partial<CustomerViewProps>) => shallow(<CustomerView {...mockProps} {...props} />);

  it('renders normally', () => {
    const wrapper = getWrapper();

    expect(wrapper.render()).toMatchSnapshot();
  });
});
