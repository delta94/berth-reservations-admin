import React from 'react';
import { shallow } from 'enzyme';
import { HashRouter } from 'react-router-dom';

import ApplicationDetails, { ApplicationDetailsProps } from '../ApplicationDetails';
import { ApplicationStatus } from '../../../@types/__generated__/globalTypes';
import { PrivateCustomerDetailsProps } from '../../privateCustomerDetails/PrivateCustomerDetails';
import { OrganizationCustomerDetailsProps } from '../../organizationCustomerDetails/OrganizationCustomerDetails';

const mockProps: ApplicationDetailsProps = {
  id: '54321',
  customerId: '47',
  berthSwitch: null,
  createdAt: 'Wed Oct 23 2019 15:15:05 GMT+0300 (Eastern European Summer Time)',
  queue: 245,
  status: ApplicationStatus.PENDING,
  boatType: 'Purjevene / moottoripursi',
  boatRegistrationNumber: 'A 12345',
  boatWidth: 3.2,
  boatLength: 6,
  boatDraught: 0.8,
  boatWeight: 350,
  boatName: 'Cama la Yano',
  boatModel: 'Marine',
  harborChoices: [
    { harborName: 'Eka satama', harbor: '123', priority: 1 },
    { harborName: 'Kolmas satama', harbor: '321', priority: 3 },
  ],
  accessibilityRequired: true,
};

const privateCustomerProfile: PrivateCustomerDetailsProps = {
  firstName: 'Testi',
  lastName: 'Käyttäjä',
  primaryAddress: {
    address: 'Testikatu 1',
    postalCode: '00100',
    city: 'Helsinki',
  },
  primaryEmail: 'test@example.com',
  primaryPhone: '0504391742',
};

const organizationCustomerProfile: OrganizationCustomerDetailsProps = {
  ...privateCustomerProfile,
  organization: {
    address: 'Liiketoimintaraitti 12',
    businessId: '1234567-8',
    city: 'Helsinki',
    name: 'Liikeyritys Oy',
    postalCode: '00100',
  },
};

describe('ApplicationDetails', () => {
  const getWrapper = (props?: Partial<ApplicationDetailsProps>) =>
    shallow(
      <HashRouter>
        <ApplicationDetails {...mockProps} {...props} />
      </HashRouter>
    );

  it('renders normally with private customer applicant', () => {
    const wrapper = getWrapper({
      applicant: privateCustomerProfile,
    });

    expect(wrapper.render()).toMatchSnapshot();
  });

  it('renders normally with organization customer applicant', () => {
    const wrapper = getWrapper({
      applicant: organizationCustomerProfile,
    });

    expect(wrapper.render()).toMatchSnapshot();
  });
});
