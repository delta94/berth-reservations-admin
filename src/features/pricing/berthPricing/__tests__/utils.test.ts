import { getBerthsData } from '../utils';
import { BerthPricing } from '../__generated__/BerthPricing';

describe('utils', () => {
  const data = {
    __typename: '',
    edges: [
      {
        node: {
          id: '68ac7db5-b397-48f6-af19-99c35d645cb6',
          name: 'sed sed debitis',
          defaultProduct: {
            priceValue: '10.2',
          },
        },
      },
    ],
  };
  describe('getBerthsData', () => {
    it('should return an array of BerthPrice objects', () => {
      expect(getBerthsData(data as BerthPricing)).toMatchSnapshot();
    });

    it("company's fee should be twice as much as the private customer's", () => {
      const berthPrices = getBerthsData(data as BerthPricing);

      expect(berthPrices[0].company).toBe((berthPrices[0].privateCustomer as number) * 2);
    });

    it('should return an empty array when the provided data is undefined or null', () => {
      expect(getBerthsData(undefined)).toEqual([]);
      expect(getBerthsData(null)).toEqual([]);
    });

    it('should remove all potential null/undefined nodes', () => {
      const data = { __typename: '', edges: [undefined, null] };

      expect(getBerthsData(data as BerthPricing)).toEqual([]);
    });
  });
});
