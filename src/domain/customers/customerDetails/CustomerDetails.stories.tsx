import React from 'react';

import CustomerDetails from './CustomerDetails';

export default {
  component: CustomerDetails,
  title: 'CustomerDetails',
};

export const customerList = () => (
  <CustomerDetails data={{ name: 'Testi Testaaja' }} />
);
