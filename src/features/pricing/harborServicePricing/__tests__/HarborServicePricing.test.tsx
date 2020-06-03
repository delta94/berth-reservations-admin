import React from 'react';
import { shallow } from 'enzyme';

import HarborServicePricing, { HarborServicePricingProps } from '../HarborServicePricing';
import { data } from '../__fixtures__/data';

describe('HarborServicePricing', () => {
  const initialProps: HarborServicePricingProps = { data, loading: false, openModal: jest.fn() };

  const getWrapper = (props: Partial<HarborServicePricingProps> = {}) =>
    shallow(<HarborServicePricing {...initialProps} {...props} />);

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
