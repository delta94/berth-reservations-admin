import React from 'react';
import { mount } from 'enzyme';
import { MockedProvider } from '@apollo/react-testing';

import HarborServicePricing, { HarborServicePricingProps } from '../HarborServicePricing';
import { data } from '../__fixtures__/data';

describe('HarborServicePricing', () => {
  const initialProps: HarborServicePricingProps = { data, loading: false };

  const getWrapper = (props: Partial<HarborServicePricingProps> = {}) =>
    mount(
      <MockedProvider>
        <HarborServicePricing {...initialProps} {...props} />
      </MockedProvider>
    );

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders normally', () => {
    const wrapper = getWrapper();

    expect(wrapper.render()).toMatchSnapshot();
  });

  it('renders noData message when there is no data', () => {
    const wrapper = getWrapper({ data: undefined });

    expect(wrapper.render()).toMatchSnapshot();
  });
});
