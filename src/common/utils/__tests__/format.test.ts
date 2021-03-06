import {
  formatAddress,
  formatBytes,
  formatDate,
  formatDimension,
  formatPercentage,
  formatPrice,
  formatWeight,
} from '../format';

describe('format', () => {
  describe('formatDimension', () => {
    it('should add at least one fraction number', () => {
      expect(formatDimension(1, 'fi')).toMatch('1,0');
    });

    it('should add "m" unit to to the supplied value', () => {
      expect(formatDimension(1, 'fi')).toMatch('m');
    });

    it('should return "-" if the value is null', () => {
      expect(formatDimension(null, 'fi')).toBe('-');
      expect(formatDimension(null, 'fi')).toBe('-');
    });
  });

  describe('formatWeight', () => {
    it('should add "kg" unit to to the supplied value', () => {
      expect(formatWeight(1, 'fi')).toMatch('kg');
    });

    it('should return "-" if the value is undefined/null', () => {
      expect(formatWeight(null, 'fi')).toBe('-');
      expect(formatWeight(null, 'fi')).toBe('-');
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
    it('should add at least two decimals', () => {
      expect(formatPrice(1, 'fi')).toMatch('1,00');
    });

    it('should add the currency unit to to the supplied value', () => {
      expect(formatPrice(1, 'fi')).toMatch('€');
    });

    it('should format prices with percentage correctly', () => {
      expect(formatPrice(1, 'fi', 0.5)).toEqual('0.5%  01,00 €');
    });
  });

  describe('formatPercentage', () => {
    it('should add the percentage sign to to the supplied value', () => {
      expect(formatPercentage(1, 'fi')).toMatch('%');
    });

    it('should return the right value', () => {
      expect(formatPercentage(10, 'fi')).toEqual('10 %');
    });
  });

  describe('formatBytes', () => {
    it('should format values <1000 as B', () => {
      expect(formatBytes(0, 'fi')).toEqual('0 B');
      expect(formatBytes(2, 'fi')).toEqual('2 B');
      expect(formatBytes(999, 'fi')).toEqual('999 B');
    });

    it('should format values >=1000 and <999950 as kB', () => {
      expect(formatBytes(1000, 'fi')).toEqual('1 kB');
      expect(formatBytes(1010, 'fi')).toEqual('1 kB');
      expect(formatBytes(1099, 'fi')).toEqual('1,1 kB');
      expect(formatBytes(999949, 'fi')).toEqual('999,9 kB');
    });

    it('should format values >=999950 as MB', () => {
      expect(formatBytes(999950, 'fi')).toEqual('1 MB');
      expect(formatBytes(1000000, 'fi')).toEqual('1 MB');
      expect(formatBytes(1099000, 'fi')).toEqual('1,1 MB');
      expect(formatBytes(999900000, 'fi')).toEqual('999,9 MB');
    });
  });

  describe('formatAddress', () => {
    it('should format an address correctly', () => {
      expect(formatAddress('Aurinkoranta 1', '00990', 'Helsinki')).toEqual('Aurinkoranta 1, 00990 Helsinki');
    });

    it('should format partial address values correctly', () => {
      expect(formatAddress(null, '00990', 'Helsinki')).toEqual('00990 Helsinki');
      expect(formatAddress('Aurinkoranta 1', null, 'Helsinki')).toEqual('Aurinkoranta 1, Helsinki');
      expect(formatAddress('Aurinkoranta 1', '00990', null)).toEqual('Aurinkoranta 1, 00990');
      expect(formatAddress(null, '00990', null)).toEqual('00990');
    });

    it('should return "-" if all values are undefined/null', () => {
      expect(formatAddress(null, undefined, null)).toEqual('-');
    });
  });
});
