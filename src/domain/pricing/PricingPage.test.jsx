import React from 'react';
import { shallow } from 'enzyme';

import PricingPage from './PricingPage';

const berthsData = [
  {
    id: '1',
    width: 2,
    privateCustomer: 116,
    company: 236,
    period: 'season',
  },
  {
    id: '2',
    width: 2.5,
    privateCustomer: 158,
    company: 326,
    period: 'season',
  },
];

const winterStorageData = [
  {
    id: '1',
    area: 'Kaisaniemi',
    privateCustomer: 8.5,
    company: 17,
    period: 'season',
  },
  {
    id: '2',
    area: 'Lähteelä',
    privateCustomer: 8.5,
    company: 17,
    period: 'season',
  },
];

const harborServicesData = [
  {
    id: '1',
    service: 'mooring',
    price: 28,
    period: 'season',
  },
  {
    id: '2',
    service: 'electricity',
    price: 28,
    period: 'season',
  },
];

const additionalServicesData = [
  {
    id: '1',
    service: 'trawlerSummerStorage',
    price: 24,
    tax: 24,
    period: 'season',
  },
  {
    id: '2',
    service: 'parkingPermit',
    price: 24,
    tax: 24,
    period: 'season',
  },
];

const mockProps = {
  berthsData,
  winterStorageData,
  harborServicesData,
  additionalServicesData,
  openModal: jest.fn(),
};

describe('PricingPage', () => {
  const getWrapper = (props = {}) =>
    shallow(<PricingPage {...mockProps} {...props} />);

  it('renders normally', () => {
    const wrapper = getWrapper();

    expect(wrapper.html()).toMatchSnapshot();
  });
});
