import { getAdditionalServiceData } from '../utils';
import { AdditionalServicePricingProps } from '../AdditionalServicePricing';
import { data } from '../__fixtures__/data';

describe('utils', () => {
  describe('getAdditionalServiceData', () => {
    it('should return an array of AdditionalService objects', () => {
      expect(getAdditionalServiceData(data)).toMatchSnapshot();
    });

    it('should return an empty array when the provided data is undefined or null', () => {
      expect(getAdditionalServiceData(undefined)).toEqual([]);
      expect(getAdditionalServiceData(null)).toEqual([]);
    });

    it('should remove all potential null/undefined nodes', () => {
      const data = { __typename: '', edges: [undefined, null] };

      expect(getAdditionalServiceData(data as AdditionalServicePricingProps['data'])).toEqual([]);
    });
  });
});
