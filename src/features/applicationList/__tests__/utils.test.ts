import { getBerthApplicationData } from '../utils';
import { mockData } from '../__fixtures__/mockData';
import {
  BERTH_APPLICATIONS,
  BERTH_APPLICATIONS_berthApplications as BerthApplicationNodeConnection,
  BERTH_APPLICATIONS_berthApplications_edges as BerthApplicationNodeEdge,
} from '../__generated__/BERTH_APPLICATIONS';
import { ApplicationStatus } from '../../../@types/__generated__/globalTypes';

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

    it('should use defaults for nullable fields', () => {
      const testEdge: BerthApplicationNodeEdge = {
        __typename: 'BerthApplicationNodeEdge',
        node: {
          __typename: 'BerthApplicationNode',
          accessibilityRequired: false,
          berthSwitch: {
            __typename: 'BerthSwitchType',
            berthNumber: '1',
            harbor: '1',
            harborName: 'Harbor',
            id: '1',
            pier: 'Pier',
            reason: null,
          },
          boatLength: 6,
          boatModel: 'Marine',
          boatName: 'Cama la Yano II',
          boatDraught: 5,
          boatRegistrationNumber: 'B 12345',
          boatType: '1',
          boatWeight: 5,
          boatWidth: 0,
          createdAt: '2020-07-16',
          customer: { __typename: 'ProfileNode', id: '1' },
          harborChoices: null,
          id: '1',
          lease: {
            __typename: 'BerthLeaseNode',
            id: '1',
            berth: {
              __typename: 'BerthNode',
              number: 7,
              pier: {
                __typename: 'PierNode',
                properties: {
                  __typename: 'PierProperties',
                  identifier: 'Pier Brosnan',
                  harbor: {
                    __typename: 'HarborNode',
                    id: '1',
                    properties: {
                      __typename: 'HarborProperties',
                      name: null,
                    },
                  },
                },
              },
            },
          },
          municipality: 'Helsinki',
          status: ApplicationStatus.PENDING,
        },
      };
      const testData: BERTH_APPLICATIONS = buildTestData([testEdge, ...mockDataApplications]);
      expect(getBerthApplicationData(testData)).toEqual(expect.not.arrayContaining([null]));
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
