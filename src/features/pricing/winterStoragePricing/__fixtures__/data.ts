import { WinterStoragePricingProps } from '../WinterStoragePricing';
import { PriceUnits } from '../../../../@types/__generated__/globalTypes';

export const data: WinterStoragePricingProps['data'] = {
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
