import { getBerths } from './utils';

describe('utils', () => {
  describe('getBerths', () => {
    test('should return an empty array when the provided data is undefined', () => {
      expect(getBerths()).toStrictEqual([]);
    });
  });
});
