import { formatDimension, formatWeight, formatDate } from './format';

describe('format', () => {
  describe('formatDimension', () => {
    it('should add at least one fraction number', () => {
      expect(formatDimension(1, 'en-US')).toMatch('1.0');
    });

    it('should add "m" unit to to the supplied value', () => {
      expect(formatDimension(1, 'en-US')).toMatch('m');
    });

    it('should fallback to the Finnish locale when the second argument is not provided', () => {
      expect(formatDimension(1)).toBe('1,0 m');
    });

    it('should return "-" if the value is undefined/null', () => {
      expect(formatDimension()).toBeNull();
      expect(formatDimension(null)).toBeNull();
    });
  });

  describe('formatWeight', () => {
    it('should add "kg" unit to to the supplied value', () => {
      expect(formatWeight(1, 'en-US')).toMatch('kg');
    });

    it('should fallback to the Finnish locale when the second argument is not provided', () => {
      expect(formatWeight(1)).toBe('1 kg');
    });

    it('should return "-" if the value is undefined/null', () => {
      expect(formatWeight()).toBeNull();
      expect(formatWeight(null)).toBeNull();
    });
  });

  describe('formatDate', () => {
    it('should add "kg" unit to to the supplied value', () => {
      expect(
        formatDate('2018-11-28T12:26:28.146227+00:00', 'en-US')
      ).toMatchSnapshot();
    });

    it('should fallback to the Finnish locale when the second argument is not provided', () => {
      expect(formatDate('2018-11-28T12:26:28.146227+00:00')).toMatchSnapshot();
    });
  });
});
