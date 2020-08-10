import { AdditionalServicePricingProps } from '../AdditionalServicePricing';
import {
  ProductServiceType,
  PriceUnits,
  PeriodType,
  AdditionalProductType,
  AdditionalProductTaxEnum,
} from '../../../../@types/__generated__/globalTypes';

export const data: AdditionalServicePricingProps['data'] = {
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
