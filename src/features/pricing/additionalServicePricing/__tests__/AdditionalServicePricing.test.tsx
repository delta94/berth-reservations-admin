import React from 'react';
import { shallow } from 'enzyme';

import AdditionalServicePricing, { AdditionalServicePricingProps } from '../AdditionalServicePricing';
import { data } from '../__fixtures__/data';

describe('AdditionalServicePricing', () => {
  const initialProps: AdditionalServicePricingProps = { data, loading: false };

  const getWrapper = (props: Partial<AdditionalServicePricingProps> = {}) =>
    shallow(<AdditionalServicePricing {...initialProps} {...props} />);

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders normally', () => {
    const wrapper = getWrapper();

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders noData message when there is no data', () => {
    const wrapper = getWrapper({ data: undefined });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
