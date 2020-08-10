import { getOfferDetailsData } from '../utils';
import { lease } from '../__fixtures__/mockData';

describe('utils', () => {
  describe('getOfferDetailsData', () => {
    test('should return the correct data', () => {
      expect(getOfferDetailsData(lease)).toMatchSnapshot();
    });
  });
});
