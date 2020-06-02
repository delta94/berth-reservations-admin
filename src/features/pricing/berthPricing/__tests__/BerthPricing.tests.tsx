import React from 'react';
import { shallow } from 'enzyme';

import BerthPricing, { BerthPricingProps } from '../BerthPricing';
import { BerthPricing as BerthPricingData } from '../__generated__/BerthPricing';
import { PriceUnits } from '../../../../@types/__generated__/globalTypes';

describe('BerthPricing', () => {
  const data: BerthPricingData = {
    __typename: 'BerthPriceGroupNodeConnection',
    edges: [
      {
        __typename: 'BerthPriceGroupNodeEdge',
        node: {
          __typename: 'BerthPriceGroupNode',
          id: '68ac7db5-b397-48f6-af19-99c35d645cb6',
          name: 'sed sed debitis',
          defaultProduct: {
            __typename: 'BerthProductNode',
            priceValue: '10.2',
            priceUnit: PriceUnits.AMOUNT,
          },
        },
      },
    ],
  };

  const initialProps: BerthPricingProps = { data, loading: false, openModal: jest.fn() };

  const getWrapper = (props = {}) => shallow(<BerthPricing {...initialProps} {...props} />);

  beforeEach(() => {
    jest.resetAllMocks();
  });
  it('renders normally', () => {
    const wrapper = getWrapper();

    expect(wrapper.html()).toMatchSnapshot();
  });
});
