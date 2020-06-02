import React from 'react';
import { shallow } from 'enzyme';

import WinterStoragePricing, { WinterStoragePricingProps } from '../WinterStoragePricing';
import { PriceUnits } from '../../../../@types/__generated__/globalTypes';

describe('WinterStoragePricing', () => {
  const data: WinterStoragePricingProps['data'] = {
    __typename: 'WinterStorageAreaNodeConnection',
    edges: [
      {
        __typename: 'WinterStorageAreaNodeEdge',
        node: {
          __typename: 'WinterStorageAreaNode',
          id: 'b3cb95f7-e9ce-438a-8447-203145f047fe',
          properties: {
            __typename: 'WinterStorageAreaProperties',
            name: 'Corporate Developer Mobility',
            product: {
              __typename: 'WinterStorageProductNode',
              priceValue: '10.2',
              priceUnit: PriceUnits.AMOUNT,
            },
          },
        },
      },
    ],
  };

  const initialProps: WinterStoragePricingProps = { data, loading: false, openModal: jest.fn() };

  const getWrapper = (props: Partial<WinterStoragePricingProps> = {}) =>
    shallow(<WinterStoragePricing {...initialProps} {...props} />);

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
