import React from 'react';
import { mount } from 'enzyme';

import CustomerDetails from '../CustomerDetails';
import {
  customerListApplications,
  customerListBerthLeases,
  customerListBills,
  customerListBoats,
  customerListEntry,
  customerListWinterStoragePlaces,
} from '../__mocks__/mockData';

describe('CustomerDetails', () => {
  const getWrapper = () =>
    mount(
      <CustomerDetails
        name={customerListEntry.name}
        address={customerListEntry.address}
        postalCode={customerListEntry.postalCode}
        city={customerListEntry.city}
        phone={customerListEntry.phone}
        email={customerListEntry.email}
        comment={customerListEntry.comment}
        berths={customerListBerthLeases}
        winterStoragePlaces={customerListWinterStoragePlaces}
        boats={customerListBoats}
        applications={customerListApplications}
        bills={customerListBills}
      />
    );

  it('renders normally', () => {
    const wrapper = getWrapper();

    expect(wrapper.render()).toMatchSnapshot();
  });
});
