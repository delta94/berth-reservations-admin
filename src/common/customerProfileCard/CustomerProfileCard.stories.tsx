import { HashRouter } from 'react-router-dom';
import React from 'react';
import { boolean, withKnobs } from '@storybook/addon-knobs';

import CustomerProfileCard from './CustomerProfileCard';
import { InvoicingType, Language, OrganizationType } from '../../@types/__generated__/globalTypes';

export default {
  component: CustomerProfileCard,
  decorators: [
    (storyFn: Function) => (
      <div
        style={{
          padding: '20px',
          backgroundColor: '#f1f1f1',
          height: '100vh',
        }}
      >
        <HashRouter>{storyFn()}</HashRouter>
      </div>
    ),
    withKnobs,
  ],
  title: 'CustomerProfileCard',
};

const baseCustomerProps = {
  customerId: '0',
  firstName: 'Matti Antero',
  invoicingType: InvoicingType.PAPER_INVOICE,
  lastName: 'Meri',
  ssn: '010101A1234',
  primaryAddress: {
    address: 'Telakkakatu 1 A 10',
    postalCode: '00100',
    city: 'Helsinki',
  },
  primaryPhone: '+358 040 1234 567',
  primaryEmail: 'matti.meri@itameri.fi',
  comment: `
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  Aenean malesuada id est ut pellentesque.
  Vivamus quis maximus sem. Ut auctor vestibulum mattis.`,
  language: Language.FINNISH,
};

export const privateCustomer = () => (
  <CustomerProfileCard {...baseCustomerProps} showCustomerNameAsLink={boolean('Show customer name as a link', false)} />
);

const organizationCustomerProps = {
  ...baseCustomerProps,
  organization: {
    address: 'Telakkakatu 1 A 10',
    businessId: '1234567-8',
    city: 'Helsinki',
    name: 'Venekuljetukset Oy',
    postalCode: '00100',
    organizationType: OrganizationType.COMPANY,
  },
};

export const organizationCustomer = () => (
  <CustomerProfileCard
    {...organizationCustomerProps}
    showCustomerNameAsLink={boolean('Show customer name as a link', false)}
  />
);
