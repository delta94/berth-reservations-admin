import { calculateBerthSummary, getHarborsData } from '../utils';
import { HARBORS } from '../__generated__/HARBORS';
import { mockData } from '../__fixtures__/mockData';

describe('utils', () => {
  describe('getHarborsData', () => {
    describe('failure path', () => {
      it('returns an empty array when "data" is undefined', () => {
        const data = undefined;
        expect(getHarborsData(data)).toHaveLength(0);
      });

      it('returns an empty array when "harbors" is null', () => {
        const data = { harbors: null };
        expect(getHarborsData(data)).toHaveLength(0);
      });

      it('returns an empty array when "harbor.node" is null', () => {
        const data = { harbors: { edges: [{ node: null }] } } as HARBORS;
        expect(getHarborsData(data)).toHaveLength(0);
      });

      it('returns an empty array when "harbor.node.properties" is null', () => {
        const data = { harbors: { edges: [{ node: { properties: null } }] } } as HARBORS;
        expect(getHarborsData(data)).toHaveLength(0);
      });
    });

    describe('success path', () => {
      it('returns an array with two harbors', () => {
        expect(getHarborsData(mockData)).toHaveLength(2);
      });

      test('harbors follow the expected shape', () => {
        const firstHarbor = getHarborsData(mockData)[0];
        const secondHarbor = getHarborsData(mockData)[1];

        expect(firstHarbor).toMatchSnapshot();
        expect(secondHarbor).toMatchSnapshot();
      });
    });
  });

  describe('calculateBerthSummary', () => {
    it('returns an empty object if data length is 0', () => {
      expect(calculateBerthSummary([])).toEqual({});
    });

    it('sums the counts together', () => {
      const result = calculateBerthSummary([
        {
          numberOfPlaces: 5,
          numberOfFreePlaces: 3,
        },
        {
          numberOfPlaces: 502,
          numberOfFreePlaces: 203,
        },
      ]);
      expect(result.berthCount).toEqual(507);
      expect(result.freeCount).toEqual(206);
    });

    it('calculates "reservedCount" from "berthCount" and "freeCount"', () => {
      const result = calculateBerthSummary([
        {
          numberOfPlaces: 5,
          numberOfFreePlaces: 3,
        },
        {
          numberOfPlaces: 502,
          numberOfFreePlaces: 203,
        },
      ]);
      expect(result.reservedCount).toEqual(301);
    });
  });
});
