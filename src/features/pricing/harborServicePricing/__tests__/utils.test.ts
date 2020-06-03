import { getHarborServicesData } from '../utils';
import { BerthPricing } from '../__generated__/BerthPricing';
import { HarborServicePricingProps } from '../HarborServicePricing';

describe('utils', () => {
  const data = {
    __typename: 'AdditionalProductNodeConnection',
    edges: [
      {
        __typename: 'AdditionalProductNodeEdge',
        node: {
          __typename: 'AdditionalProductNode',
          id: 'a8400b59-534c-4934-b643-083a4273ca1a',
          service: 'DINGHY_PLACE',
          priceValue: 10,
          priceUnit: 'AMOUNT',
          period: 'SEASON',
          productType: 'OPTIONAL_SERVICE',
          taxPercentage: 'TAX_24_00',
        },
      },
    ],
  };

  describe('getHarborServicesData', () => {
    it('should return an array of HarborService objects', () => {
      expect(getHarborServicesData(data as HarborServicePricingProps['data'])).toMatchSnapshot();
    });

    it('should return an empty array when the provided data is undefined or null', () => {
      expect(getHarborServicesData(undefined)).toEqual([]);
      expect(getHarborServicesData(null)).toEqual([]);
    });

    it('should remove all potential null/undefined nodes', () => {
      const data = { __typename: '', edges: [undefined, null] };

      expect(getHarborServicesData(data as HarborServicePricingProps['data'])).toEqual([]);
    });
  });
});
