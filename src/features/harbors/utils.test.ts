import { getHarborsData } from './utils';
import { HARBORS } from './__generated__/HARBORS';
import { mockData } from './__mocks__/mockData';

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
});
