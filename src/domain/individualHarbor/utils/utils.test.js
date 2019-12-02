import { getBerths } from './utils';
import { IndividualHarborQueryData } from './mockData';

describe('utils', () => {
  describe('getBerths', () => {
    it('should return an empty array when the provided data is undefined', () => {
      expect(getBerths()).toStrictEqual([]);
    });

    it('should return an array of Berth objects', () => {
      const berths = getBerths(IndividualHarborQueryData);

      expect(berths).toMatchSnapshot();
    });
  });
});
