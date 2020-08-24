import React from 'react';
import { mount } from 'enzyme';
import { HashRouter } from 'react-router-dom';

import ApplicationView, { ApplicationViewProps } from '../ApplicationView';
import { ApplicationStatus, Language } from '../../../@types/__generated__/globalTypes';

const mockProps: ApplicationViewProps = {
  applicationDetails: {
    accessibilityRequired: false,
    berthSwitch: null,
    boatDraught: null,
    boatLength: 5,
    boatModel: 'Marine',
    boatName: 'Cama la Yano',
    boatRegistrationNumber: 'A 12345',
    boatWeight: null,
    boatWidth: 5,
    createdAt: '2020-08-04',
    choices: [],
    id: 'X',
    queue: null,
    status: ApplicationStatus.PENDING,
  },
  berthApplication: {
    address: 'Testikatu 1',
    email: 'test@example.com',
    firstName: 'Testi',
    id: '1',
    lastName: 'Käyttäjä',
    municipality: 'Helsinki',
    phoneNumber: '0500000000',
    zipCode: '00100',
  },
  customerProfile: null,
  leaseDetails: null,
  refetchQueries: [],
  handleDeleteLease: jest.fn(),
  handleLinkCustomer: jest.fn(),
};

// LinkApplicationToCustomer is mocked to limit the test scope
jest.mock('../../linkApplicationToCustomer/LinkApplicationToCustomerContainer', () => {
  const LinkApplicationToCustomerContainer = () => <div>LinkApplicationToCustomerContainer</div>;

  return {
    __esModule: true,
    default: LinkApplicationToCustomerContainer,
  };
});

describe('ApplicationView', () => {
  const getWrapper = (props?: Partial<ApplicationViewProps>) =>
    mount(
      <HashRouter>
        <ApplicationView {...mockProps} {...props} />
      </HashRouter>
    );

  it('renders normally with minimum props', () => {
    const wrapper = getWrapper();

    expect(wrapper.render()).toMatchSnapshot();
  });

  it('renders title as "New application" if applicationDetails.berthSwitch is null', () => {
    const wrapper = getWrapper();

    expect(wrapper.find('div.pageHeader>Text').text()).toMatch('Uusi hakemus');
  });

  it('renders title as "Switch application" if applicationDetails.berthSwitch is not null', () => {
    const wrapper = getWrapper({
      applicationDetails: {
        ...mockProps.applicationDetails,
        berthSwitch: { berthNum: 0, harborId: '', harborName: '', pierIdentifier: '', reason: 'Reason' },
      },
    });

    expect(wrapper.find('div.pageHeader>Text').text()).toMatch('Vaihtohakemus');
  });

  it('renders CustomerProfileCard and ActionHistoryCard with "customerProfile" prop', () => {
    const wrapper = getWrapper({
      customerProfile: { firstName: 'Testi', language: Language.FINNISH, lastName: 'Käyttäjä' },
    });

    expect(wrapper.find('CustomerProfileCard')).toHaveLength(1);
    expect(wrapper.find('ActionHistoryCard')).toHaveLength(1);
    expect(wrapper.find('LinkApplicationToCustomerContainer')).toHaveLength(0);
  });

  it('renders LinkApplicationToCustomerContainer without "customerProfile" prop', () => {
    const wrapper = getWrapper();

    expect(wrapper.find('CustomerProfileCard')).toHaveLength(0);
    expect(wrapper.find('ActionHistoryCard')).toHaveLength(0);
    expect(wrapper.find('LinkApplicationToCustomerContainer')).toHaveLength(1);
  });

  it('does not render OfferCard without "leaseDetails" prop', () => {
    const wrapper = getWrapper();

    expect(wrapper.find('OfferCard')).toHaveLength(0);
  });

  it('renders OfferCard with "leaseDetails" prop', () => {
    const wrapper = getWrapper({
      leaseDetails: {
        berthComment: '',
        berthDepth: null,
        berthIsAccessible: false,
        berthLength: null,
        berthMooringType: null,
        berthNum: 0,
        berthWidth: null,
        electricity: false,
        gate: false,
        harborName: '',
        id: '',
        lighting: false,
        order: null,
        pierIdentifier: '',
        wasteCollection: false,
        water: false,
      },
    });

    expect(wrapper.find('OfferCard')).toHaveLength(1);
  });
});
