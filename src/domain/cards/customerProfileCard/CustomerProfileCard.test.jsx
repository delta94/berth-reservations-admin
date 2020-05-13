import React from 'react';
import { shallow } from 'enzyme';
import { HashRouter } from 'react-router-dom';

import CustomerProfileCard from './CustomerProfileCard';
import { InvoicingType, OrganizationType } from '../../../@types/__generated__/globalTypes';

const privateCustomerProfile = {
  comment: 'Testikäyttäjä',
  customerId: '0',
  firstName: 'Testi',
  invoicingType: InvoicingType.PAPER_INVOICE,
  lastName: 'Käyttäjä',
  primaryAddress: {
    address: 'Testikatu 1',
    postalCode: '00100',
    city: 'Helsinki',
  },
  primaryEmail: 'test@example.com',
  primaryPhone: '0504391742',
  ssn: '010101A1234',
};

const organizationCustomerProfile = {
  comment: 'Testikäyttäjä',
  customerId: '0',
  firstName: 'Testi',
  invoicingType: InvoicingType.PAPER_INVOICE,
  lastName: 'Käyttäjä',
  organization: {
    address: 'Liiketoimintaraitti 12',
    businessId: '1234567-8',
    city: 'Helsinki',
    name: 'Liikeyritys Oy',
    organizationType: OrganizationType.COMPANY,
    postalCode: '00100',
  },
  primaryAddress: {
    address: 'Testikatu 1',
    postalCode: '00100',
    city: 'Helsinki',
  },
  primaryEmail: 'test@example.com',
  primaryPhone: '0504391742',
  ssn: '010101A1234',
};

describe('CustomerProfileCard', () => {
  const getWrapper = (props) =>
    shallow(
      <HashRouter>
        <CustomerProfileCard {...props} />
      </HashRouter>
    );

  describe('with the minimum private customer profile fields', () => {
    it('renders normally', () => {
      const wrapper = getWrapper({
        firstName: 'Testi',
        lastName: 'Käyttäjä',
      });
      expect(wrapper.html()).toMatchSnapshot();
    });
  });

  describe('with a private customer profile', () => {
    it('renders normally', () => {
      const wrapper = getWrapper(privateCustomerProfile);
      expect(wrapper.html()).toMatchSnapshot();
    });

    it('does not show the customer names and ssn as links if not specified', () => {
      const wrapper = getWrapper({
        ...privateCustomerProfile,
        showCustomerNameAsLink: false,
      });
      expect(wrapper.render().find('a.internalLink[href="#/customers/0"]').length).toEqual(0);
    });

    it('shows the customer names and ssn as links if specified', () => {
      const wrapper = getWrapper({
        ...privateCustomerProfile,
        showCustomerNameAsLink: true,
      });
      expect(wrapper.render().find('a.internalLink[href="#/customers/0"]').length).toEqual(3); // 3: firstName, lastName, ssn
    });
  });

  describe('with the minimum organization customer profile fields', () => {
    it('renders normally', () => {
      const wrapper = getWrapper({
        firstName: 'Testi',
        lastName: 'Käyttäjä',
        organization: organizationCustomerProfile.organization,
      });
      expect(wrapper.html()).toMatchSnapshot();
    });
  });

  describe('with an organization customer profile', () => {
    it('renders normally', () => {
      const wrapper = getWrapper(organizationCustomerProfile);
      expect(wrapper.html()).toMatchSnapshot();
    });

    it('does not show the customer names and ssn as links if not specified', () => {
      const wrapper = getWrapper({
        ...organizationCustomerProfile,
        showCustomerNameAsLink: false,
      });
      expect(wrapper.render().find('a.internalLink[href="#/customers/0"]').length).toEqual(0);
    });

    it('shows the customer names and ssn as links if specified', () => {
      const wrapper = getWrapper({
        ...organizationCustomerProfile,
        showCustomerNameAsLink: true,
      });
      expect(wrapper.render().find('a.internalLink[href="#/customers/0"]').length).toEqual(3); // 3: firstName, lastName, ssn
    });
  });
});
