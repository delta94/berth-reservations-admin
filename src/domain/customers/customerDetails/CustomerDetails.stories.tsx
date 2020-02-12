import React from 'react';

import CustomerDetails from './CustomerDetails';

export default {
  component: CustomerDetails,
  title: 'CustomerDetails',
};

export const customerDetails = () => (
  <CustomerDetails
    name="Mikko Matias Mallikas"
    address="Telakkakatu 1 A 10"
    postalCode="00100"
    city="Helsinki"
    phone="+358 040 123 4567"
    email="mikko.mallikas@meri.fi"
    group="Yksityinen"
    berths={[
      { id: '123', title: 'Pursilahdenranta B31' },
      { id: '321', title: 'Strömsinlahdenranta B31' },
    ]}
    winterStoragePlaces={[{ id: '123', title: 'Rajasaari' }]}
    boats={[{ id: '123', name: 'Cama la Yano' }]}
    applications={[{ id: '123', date: '2019-12-01' }]}
    bills={[{ id: '123', date: '2020-01-21' }]}
    comment="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean malesuada id est ut pellentesque. Vivamus quis maximus sem. Ut auctor vestibulum mattis. Vestibulum mollis diam convallis ligula consequat sagittis."
  />
);
