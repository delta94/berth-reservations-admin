import React from 'react';
import { shallow } from 'enzyme';

import PricingPage, { PricingPageProps } from '../PricingPage';
import { data as berthsData } from '../berthPricing/__fixtures__/data';
import { data as winterStorageData } from '../winterStoragePricing/__fixtures__/data';
import { data as harborServicesData } from '../harborServicePricing/__fixtures__/data';
import { data as additionalServicesData } from '../additionalServicePricing/__fixtures__/data';

const initialProps: PricingPageProps = {
  berthsData,
  berthsLoading: false,
  winterStorageData,
  winterStorageLoading: false,
  harborServicesData,
  harborServicesLoading: false,
  additionalServicesData,
  additionalServicesLoading: false,
  openModal: jest.fn(),
};

describe('PricingPage', () => {
  const getWrapper = (props: Partial<PricingPageProps> = {}) => shallow(<PricingPage {...initialProps} {...props} />);

  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('renders normally', () => {
    const wrapper = getWrapper();

    expect(wrapper.html()).toMatchSnapshot();
  });
});
