import { BerthPricingProps } from '../BerthPricing';
import { PriceUnits } from '../../../../@types/__generated__/globalTypes';

export const data: BerthPricingProps['data'] = {
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
