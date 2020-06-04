import { getBerths } from '../utils';
import { IndividualHarborQueryData } from '../__fixtures__/mockData';

describe('utils', () => {
  describe('getBerths', () => {
    it('should return an empty array when the provided data is undefined', () => {
      expect(getBerths(undefined)).toStrictEqual([]);
    });

    it('should return an array of Berth objects', () => {
      const berths = getBerths(IndividualHarborQueryData);

      expect(berths).toMatchSnapshot();
    });
  });
});
