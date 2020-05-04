import React from 'react';
import { shallow } from 'enzyme';

import PricingPage from './PricingPage';

const harborData = [
  {
    id: '1',
    width: '2 m',
    privateCustomer: '116 €',
    company: '236 €',
    period: 'kausi',
  },
  {
    id: '2',
    width: '2,5 m',
    privateCustomer: '158 €',
    company: '326 €',
    period: 'kausi',
  },
];

const winterStorageData = [
  {
    id: '1',
    area: 'Kaisaniemi',
    privateCustomer: '8,5 €',
    company: '17 €',
    period: 'kausi',
  },
  {
    id: '2',
    area: 'Lähteelä',
    privateCustomer: '8,5 €',
    company: '17 €',
    period: 'kausi',
  },
];

const harborServices = [
  {
    id: '1',
    service: 'Kiinnitys',
    price: '28 €',
    period: 'kausi',
  },
  {
    id: '2',
    service: 'Sähkö',
    price: '28 €',
    period: 'kausi',
  },
];

const additionalServices = [
  {
    id: '1',
    service: 'Trailerin kesäsäilytys',
    price: '24 €',
    tax: '24 %',
    period: 'kausi',
  },
  {
    id: '2',
    service: 'Pysäköintilupa',
    price: '24 €',
    tax: '24 %',
    period: 'kausi',
  },
];

const mockProps = {
  harborData,
  winterStorageData,
  harborServices,
  additionalServices,
};

describe('PricingPage', () => {
  const getWrapper = (props = {}) =>
    shallow(<PricingPage {...mockProps} {...props} />);

  it('renders normally', () => {
    const wrapper = getWrapper();

    expect(wrapper.html()).toMatchSnapshot();
  });
});
