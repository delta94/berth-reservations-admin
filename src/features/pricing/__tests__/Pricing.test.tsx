import React from 'react';
import { shallow } from 'enzyme';

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
  openModal: jest.fn(),
};

describe('Pricing', () => {
  const getWrapper = (props: Partial<PricingProps> = {}) => shallow(<Pricing {...initialProps} {...props} />);

  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('renders normally', () => {
    const wrapper = getWrapper();

    expect(wrapper.render()).toMatchSnapshot();
  });
});
