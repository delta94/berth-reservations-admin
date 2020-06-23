import React from 'react';
import { mount } from 'enzyme';
import { MockedProvider } from '@apollo/react-testing';

import Pricing, { PricingProps } from '../Pricing';
import { data as berthsData } from '../berthPricing/__fixtures__/data';
import { data as winterStorageData } from '../winterStoragePricing/__fixtures__/data';
import { data as harborServicesData } from '../harborServicePricing/__fixtures__/data';
import { data as additionalServicesData } from '../additionalServicePricing/__fixtures__/data';

const initialProps: PricingProps = {
  berthsData,
  berthsLoading: false,
  winterStorageData,
  winterStorageLoading: false,
  harborServicesData,
  harborServicesLoading: false,
  additionalServicesData,
  additionalServicesLoading: false,
};

describe('PricingPage', () => {
  const getWrapper = (props: Partial<PricingProps> = {}) =>
    mount(
      <MockedProvider>
        <Pricing {...initialProps} {...props} />
      </MockedProvider>
    );

  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('renders normally', () => {
    const wrapper = getWrapper();

    expect(wrapper.render()).toMatchSnapshot();
  });
});
