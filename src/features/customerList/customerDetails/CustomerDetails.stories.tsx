import React from 'react';

import CustomerDetails from './CustomerDetails';
import {
  customerListApplications,
  customerListBerthLeases,
  customerListBills,
  customerListBoats,
  customerListEntry,
  customerListWinterStoragePlaces,
} from './__mocks__/mockData';

export default {
  component: CustomerDetails,
  title: 'CustomerDetails',
};

export const customerDetails = () => (
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
