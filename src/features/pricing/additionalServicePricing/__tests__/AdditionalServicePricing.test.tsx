import React from 'react';
import { shallow } from 'enzyme';

import AdditionalServicePricing, { AdditionalServicePricingProps } from '../AdditionalServicePricing';
import {
  ProductServiceType,
  PriceUnits,
  PeriodType,
  AdditionalProductType,
  AdditionalProductTaxEnum,
} from '../../../../@types/__generated__/globalTypes';

describe('AdditionalServicePricing', () => {
  const data: AdditionalServicePricingProps['data'] = {
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

  const initialProps: AdditionalServicePricingProps = { data, loading: false, openModal: jest.fn() };

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
