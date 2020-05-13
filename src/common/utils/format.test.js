import { formatDimension, formatWeight, formatDate, formatPrice, formatPercentage } from './format';

describe('format', () => {
  describe('formatDimension', () => {
    it('should add at least one fraction number', () => {
      expect(formatDimension(1, 'fi')).toMatch('1,0');
    });

    it('should add "m" unit to to the supplied value', () => {
      expect(formatDimension(1, 'fi')).toMatch('m');
    });

    it('should return "-" if the value is undefined/null', () => {
      expect(formatDimension()).toBe('-');
      expect(formatDimension(null)).toBe('-');
    });
  });

  describe('formatWeight', () => {
    it('should add "kg" unit to to the supplied value', () => {
      expect(formatWeight(1, 'fi')).toMatch('kg');
    });

    it('should return "-" if the value is undefined/null', () => {
      expect(formatWeight()).toBe('-');
      expect(formatWeight(null)).toBe('-');
    });
  });

  describe('formatDate', () => {
    it('should format the date according to the supplied locale', () => {
      expect(formatDate('2018-11-28T12:26:28.146227+00:00', 'fi')).toMatchSnapshot();
    });

    it('should include time info when the third argument is true', () => {
      expect(formatDate('2018-11-28T12:26:28.146227+00:00', 'fi', true)).toMatchSnapshot();
    });
  });

  describe('formatPrice', () => {
    it('should add at least two fraction numbers', () => {
      expect(formatPrice(1, 'fi')).toMatch('1,00');
    });

    it('should add the currency unit to to the supplied value', () => {
      expect(formatPrice(1, 'fi')).toMatch('€');
    });
  });

  describe('formatPercentage', () => {
    it('should add the percentage sign to to the supplied value', () => {
      expect(formatPercentage(1, 'fi')).toMatch('%');
    });
  });
});
