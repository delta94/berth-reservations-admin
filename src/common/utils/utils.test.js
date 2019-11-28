import { covertToString, convertCmToM } from './utils';

describe('utils', () => {
  describe('covertToString', () => {
    it('coverts the supplied value into a string', () => {
      expect(covertToString(1)).toBe('1');
    });

    it('returns an empty string if the supplied value is either null or undefined', () => {
      expect(covertToString(undefined)).toBe('');
      expect(covertToString(null)).toBe('');
    });
  });

  describe('convertCmToM', () => {
    it('converts CM values to Meters', () => {
      expect(convertCmToM(100)).toBe(1);
    });
  });
});
