import React from 'react';
import { shallow } from 'enzyme';

import HarborServicePricing, { HarborServicePricingProps } from '../HarborServicePricing';
import {
  ProductServiceType,
  PeriodType,
  PriceUnits,
  AdditionalProductType,
  AdditionalProductTaxEnum,
} from '../../../../@types/__generated__/globalTypes';

describe('HarborServicePricing', () => {
  const data: HarborServicePricingProps['data'] = {
    __typename: 'AdditionalProductNodeConnection',
    edges: [
      {
        __typename: 'AdditionalProductNodeEdge',
        node: {
          __typename: 'AdditionalProductNode',
          id: 'a8400b59-534c-4934-b643-083a4273ca1a',
          service: ProductServiceType.DINGHY_PLACE,
          priceValue: 10,
          priceUnit: PriceUnits.AMOUNT,
          period: PeriodType.SEASON,
          productType: AdditionalProductType.OPTIONAL_SERVICE,
          taxPercentage: AdditionalProductTaxEnum.TAX_24_00,
        },
      },
    ],
  };

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
