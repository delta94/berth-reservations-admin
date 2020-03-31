import { getBoats } from './utils';

const mockBoats = [
  {
    node: {
      id: 'fb2a761f-ccc2-421a-9e32-0957b2510be9',
      boatType: {
        id: '6',
        name: 'Purjevene / moottoripursi',
      },
      width: 2.5,
      length: 7,
      draught: null,
      weight: null,
      name: 'Boaty McBerth',
      model: '',
      registrationNumber: 'VEN-101',
    },
  },
  {
    node: {
      id: '2250193b-aecd-4402-bb12-56a2142ae644',
      boatType: { id: '2', name: 'Soutuvene' },
      width: 1,
      length: 3,
      draught: null,
      weight: null,
      name: 'RowRowRowYourBoat',
      model: '',
      registrationNumber: '',
    },
  },
];

describe('utils', () => {
  describe('getBoats', () => {
    it('should return an empty array when the provided profile has no boats', () => {
      const profile = { boats: null };
      const boats = getBoats(profile);

      expect(boats).toEqual([]);
    });

    it('should return an array of boat objects', () => {
      const profile = { boats: { edges: mockBoats } };
      const boats = getBoats(profile);

      expect(boats).toMatchSnapshot();
    });

    it('should remove the edges with a value of null from the provided boats array', () => {
      const profile = { boats: { edges: [null, ...mockBoats] } };
      const boats = getBoats(profile);

      expect(boats).toEqual(expect.not.arrayContaining([null]));
    });

    it('should remove the nodes with a value of null from the provided boats array', () => {
      const profile = { boats: { edges: [{ node: null }, ...mockBoats] } };
      const boats = getBoats(profile);

      expect(boats).toEqual(expect.not.arrayContaining([null]));
    });
  });
});
