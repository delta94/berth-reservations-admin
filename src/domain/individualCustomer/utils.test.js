import { getBoats, getLeases } from './utils';

const mockLeases = [
  {
    node: {
      id: 'e4876a7d-86fc-4c13-90fa-2b2e4e935431',
      status: 'PAID',
      startDate: '2019-05-06',
      endDate: '2019-09-14',
      berth: {
        number: '30',
        pier: {
          properties: {
            identifier: 'A',
            harbor: {
              id: '78e5a1bc-5fde-470e-8236-298427877d0f',
              properties: {
                name: 'Puotilan venesatama',
              },
            },
          },
        },
      },
    },
  },
];

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
  describe('getLeases', () => {
    it('should return an empty array when the provided profile has no berthLeases', () => {
      const profile = { berthLeases: null };
      const leases = getLeases(profile);

      expect(leases).toEqual([]);
    });

    it('should return an array of lease objects', () => {
      const profile = { berthLeases: { edges: mockLeases } };
      const leases = getLeases(profile);

      expect(leases).toMatchSnapshot();
    });

    it('should remove the edges with a value of null from the provided leases array', () => {
      const profile = { berthLeases: { edges: [null, ...mockLeases] } };
      const leases = getLeases(profile);

      expect(leases).toEqual(expect.not.arrayContaining([null]));
    });

    it('should remove the nodes with a value of null from the provided berthLeases array', () => {
      const profile = {
        berthLeases: { edges: [{ node: null }, ...mockLeases] },
      };
      const leases = getLeases(profile);

      expect(leases).toEqual(expect.not.arrayContaining([null]));
    });

    it('should remove the berthLease node that has any status other than PAID', () => {
      const edges = [
        ...mockLeases,
        { node: { ...mockLeases[0].node, status: 'REFUSED' } },
      ];
      const profile = { berthLeases: { edges } };
      const leases = getLeases(profile);

      expect(leases).toHaveLength(mockLeases.length);
    });
  });

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
