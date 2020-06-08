import { getWinterStorageData } from '../utils';
import { WinterStoragePricing } from '../__generated__/WinterStoragePricing';
import { data } from '../__fixtures__/data';

describe('utils', () => {
  describe('getWinterStorageData', () => {
    it('should return an array of WinterStoragePrice objects', () => {
      expect(getWinterStorageData(data)).toMatchSnapshot();
    });

    it("company's fee should be twice as much as the private customer's", () => {
      const berthPrices = getWinterStorageData(data as WinterStoragePricing);

      expect(berthPrices[0].company).toBe((berthPrices[0].privateCustomer as number) * 2);
    });

    it('should return an empty array when the provided data is undefined or null', () => {
      expect(getWinterStorageData(undefined)).toEqual([]);
      expect(getWinterStorageData(null)).toEqual([]);
    });

    it('should remove all potential null/undefined nodes', () => {
      const data = { __typename: '', edges: [null] };

      expect(getWinterStorageData(data as WinterStoragePricing)).toEqual([]);
    });
  });
});
