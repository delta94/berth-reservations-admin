import { getHarborServicesData } from '../utils';
import { HarborServicePricingProps } from '../HarborServicePricing';
import { data } from '../__fixtures__/data';

describe('utils', () => {
  describe('getHarborServicesData', () => {
    it('should return an array of HarborService objects', () => {
      expect(getHarborServicesData(data)).toMatchSnapshot();
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
