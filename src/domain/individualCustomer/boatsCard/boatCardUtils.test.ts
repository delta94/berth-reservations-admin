import { isLargeBoat } from './boatsCardUtils';
import { Boat, LargeBoat } from '../types';

const boat: Partial<Boat> = {
  id: '1',
  boatType: {
    id: '7',
    name: 'Troolari',
  },
};

const largeBoat: Partial<LargeBoat> = {
  id: '2',
  boatType: {
    id: '8',
    name: 'Suuri alus (yli 20t)',
  },
};

describe('boat card utils', () => {
  describe('isLargeBoat', () => {
    it('should detect large boat', () => {
      expect(isLargeBoat(boat as any)).toEqual(false);
      expect(isLargeBoat(largeBoat as any)).toEqual(true);
    });
  });
});
