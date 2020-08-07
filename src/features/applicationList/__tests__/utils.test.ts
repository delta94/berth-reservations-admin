import { getBerthApplicationData } from '../utils';
import { mockData } from '../__fixtures__/mockData';
import {
  BERTH_APPLICATIONS,
  BERTH_APPLICATIONS_berthApplications as BerthApplicationNodeConnection,
  BERTH_APPLICATIONS_berthApplications_edges as BerthApplicationNodeEdge,
} from '../__generated__/BERTH_APPLICATIONS';

const mockDataApplications = (mockData.berthApplications as BerthApplicationNodeConnection).edges;

const buildTestData = (edges: (BerthApplicationNodeEdge | null)[]): BERTH_APPLICATIONS => ({
  berthApplications: {
    __typename: 'BerthApplicationNodeConnection',
    count: 1,
    edges: edges,
  },
  boatTypes: [{ __typename: 'BoatTypeType', id: '1', name: 'Purjevene' }],
});

describe('utils', () => {
  describe('getBerthApplicationData', () => {
    it('should return berth application data', () => {
      expect(getBerthApplicationData(mockData)).toMatchSnapshot();
    });

    it('should return empty array when there are no berth applications', () => {
      const testData: BERTH_APPLICATIONS = buildTestData([]);
      expect(getBerthApplicationData(testData)).toEqual([]);
    });

    it('should remove the edges with a value of null', () => {
      const testData: BERTH_APPLICATIONS = buildTestData([null, ...mockDataApplications]);
      expect(getBerthApplicationData(testData)).toEqual(expect.not.arrayContaining([null]));
    });

    it('should remove the nodes with a value of null', () => {
      const testData: BERTH_APPLICATIONS = buildTestData([
        {
          __typename: 'BerthApplicationNodeEdge',
          node: null,
        },
        ...mockDataApplications,
      ]);
      expect(getBerthApplicationData(testData)).toEqual(expect.not.arrayContaining([null]));
    });
  });
});
