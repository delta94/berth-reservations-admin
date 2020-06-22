import { getWinterStorageAreasData } from '../utils';
import { WINTER_STORAGE_AREAS } from '../__generated__/WINTER_STORAGE_AREAS';
import { mockData } from '../__fixtures__/mockData';

describe('utils', () => {
  describe('getWinterStorageAreasData', () => {
    describe('failure path', () => {
      it('returns an empty array when "data" is undefined', () => {
        const data = undefined;
        expect(getWinterStorageAreasData(data)).toHaveLength(0);
      });

      it('returns an empty array when "winterStorageAreas" is null', () => {
        const data = { winterStorageAreas: null };
        expect(getWinterStorageAreasData(data)).toHaveLength(0);
      });

      it('returns an empty array when "winterStorageArea.node" is null"', () => {
        const data = { winterStorageAreas: { edges: [{ node: null }] } } as WINTER_STORAGE_AREAS;
        expect(getWinterStorageAreasData(data)).toHaveLength(0);
      });

      it('returns an empty array when "winterStorageArea.node.properties" is null', () => {
        const data = { winterStorageAreas: { edges: [{ node: { properties: null } }] } } as WINTER_STORAGE_AREAS;
        expect(getWinterStorageAreasData(data)).toHaveLength(0);
      });
    });

    describe('success path', () => {
      it('returns an array with two winter storage areas', () => {
        expect(getWinterStorageAreasData(mockData)).toHaveLength(2);
      });

      it('winter storage areas follow the expected shape', () => {
        const firstWinterStorageArea = getWinterStorageAreasData(mockData)[0];
        const secondWinterStorageArea = getWinterStorageAreasData(mockData)[1];

        expect(firstWinterStorageArea).toMatchSnapshot();
        expect(secondWinterStorageArea).toMatchSnapshot();
      });
    });
  });
});
