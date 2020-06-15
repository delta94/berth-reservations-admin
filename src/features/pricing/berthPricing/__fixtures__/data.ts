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
          id: '7667c0af-a6dd-4d33-89c5-9142918b14d4',
          priceValue: '10.2',
          priceUnit: PriceUnits.AMOUNT,
        },
      },
    },
  ],
};
