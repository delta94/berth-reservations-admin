import React from 'react';
import { shallow } from 'enzyme';

import BerthPricing, { BerthPricingProps } from '../BerthPricing';
import { data } from '../__fixtures__/data';

describe('BerthPricing', () => {
  const initialProps: BerthPricingProps = { data, loading: false };

  const getWrapper = (props: Partial<BerthPricingProps> = {}) => shallow(<BerthPricing {...initialProps} {...props} />);

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
