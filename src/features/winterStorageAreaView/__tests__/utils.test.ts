import { getWinterStoragePlaces } from '../utils';
import { mockData } from '../__fixtures__/mockData';

describe('utils', () => {
  describe('getWinterStoragePlaces', () => {
    it('should parse places from data correctly', () => {
      const places = getWinterStoragePlaces(mockData);
      expect(places).toMatchSnapshot();
    });
  });
});
