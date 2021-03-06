import React from 'react';
import { mount } from 'enzyme';
import { MockedProvider } from '@apollo/react-testing';

import AdditionalServicePricing, { AdditionalServicePricingProps } from '../AdditionalServicePricing';
import { data } from '../__fixtures__/data';

describe('AdditionalServicePricing', () => {
  const initialProps: AdditionalServicePricingProps = { data, loading: false };

  const getWrapper = (props: Partial<AdditionalServicePricingProps> = {}) =>
    mount(
      <MockedProvider>
        <AdditionalServicePricing {...initialProps} {...props} />
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
