import { isNumber, isPositive, replaceCommaWithDot, replaceDotWithComma } from '../utils';

describe('utils', () => {
  describe('isNumber', () => {
    it('returns true if value is a number', () => {
      expect(isNumber('4')).toEqual(true);
      expect(isNumber('4.4')).toEqual(true);
      expect(isNumber('4,4')).toEqual(true);
      expect(isNumber('-4.4')).toEqual(true);
      expect(isNumber('-4,4')).toEqual(true);
    });

    it('returns false if value is not accepted as a number', () => {
      expect(isNumber('4a')).toEqual(false);
      expect(isNumber('--4')).toEqual(false);
      expect(isNumber('4..4')).toEqual(false);
      expect(isNumber('4.,4')).toEqual(false);
      expect(isNumber('4,.4')).toEqual(false);
      expect(isNumber('four')).toEqual(false);
      expect(isNumber('.')).toEqual(false);
    });
  });

  describe('isPositive', () => {
    it('returns true if value is positive', () => {
      expect(isPositive('1')).toEqual(true);
      expect(isPositive('0')).toEqual(true);
    });

    it('returns false if value is negative', () => {
      expect(isPositive('-1')).toEqual(false);
    });
  });

  describe('replaceCommaWithDot', () => {
    it('replaces dots with commas', () => {
      expect(replaceCommaWithDot('12,5')).toEqual('12.5');
    });
  });

  describe('replaceDotWithComma', () => {
    it('replaces dots with commas', () => {
      expect(replaceDotWithComma('12.5')).toEqual('12,5');
    });
  });
});
