import {
  BERTH_APPLICATIONS,
  BERTH_APPLICATIONS_berthApplications_edges as BerthApplicationNodeEdge,
} from '../__generated__/BERTH_APPLICATIONS';
import { getBerthApplicationData } from '../utils';
import { ApplicationStatus } from '../../../@types/__generated__/globalTypes';

export const mockData: BERTH_APPLICATIONS = {
  berthApplications: {
    __typename: 'BerthApplicationNodeConnection',
    count: 3,
    edges: [
      // Full structure
      {
        __typename: 'BerthApplicationNodeEdge',
        node: {
          __typename: 'BerthApplicationNode',
          accessibilityRequired: false,
          berthSwitch: {
            __typename: 'BerthSwitchType',
            berthNumber: '1',
            harbor: 'MOCK-HARBOR-0',
            harborName: 'Testisatama',
            id: 'MOCK-BERTH-SWITCH-0',
            pier: 'A',
            reason: { __typename: 'BerthSwitchReasonType', title: 'Reason' },
          },
          boatLength: 6,
          boatModel: 'Marine',
          boatName: 'Cama la Yano',
          boatDraught: 5,
          boatRegistrationNumber: 'A 12345',
          boatType: '1',
          boatWeight: 5,
          boatWidth: 0,
          createdAt: '2020-07-16',
          customer: { __typename: 'ProfileNode', id: 'MOCK-PROFILE' },
          harborChoices: [{ __typename: 'HarborChoiceType', harbor: '1', harborName: '1', priority: 0 }],
          id: 'MOCK-APPLICATION-0',
          lease: {
            __typename: 'BerthLeaseNode',
            berth: {
              __typename: 'BerthNode',
              number: 7,
              pier: {
                __typename: 'PierNode',
                properties: {
                  __typename: 'PierProperties',
                  harbor: {
                    __typename: 'HarborNode',
                    id: 'MOCK-HARBOR-0',
                    properties: { __typename: 'HarborProperties', name: 'Testisatama' },
                  },
                  identifier: 'G',
                },
              },
            },
            id: 'MOCK-LEASE-0',
          },
          municipality: 'Helsinki',
          status: ApplicationStatus.PENDING,
        },
      },
      // Most structure and nulled fields
      {
        __typename: 'BerthApplicationNodeEdge',
        node: {
          __typename: 'BerthApplicationNode',
          accessibilityRequired: false,
          berthSwitch: {
            __typename: 'BerthSwitchType',
            berthNumber: '2',
            harbor: 'MOCK-HARBOR-0',
            harborName: 'Testisatama',
            id: 'MOCK-BERTH-SWITCH-1',
            pier: 'A',
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
          customer: { __typename: 'ProfileNode', id: 'MOCK-PROFILE' },
          harborChoices: null,
          id: 'MOCK-APPLICATION-0',
          lease: {
            __typename: 'BerthLeaseNode',
            id: 'MOCK-LEASE-1',
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
                    id: 'MOCK-HARBOR-1',
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
      },
      // Minimum fields
      {
        __typename: 'BerthApplicationNodeEdge',
        node: {
          __typename: 'BerthApplicationNode',
          accessibilityRequired: false,
          berthSwitch: null,
          boatLength: 6,
          boatModel: 'Marine',
          boatName: 'Cama la Yano 3-D',
          boatDraught: 5,
          boatRegistrationNumber: 'C 12345',
          boatType: '1',
          boatWeight: 5,
          boatWidth: 0,
          createdAt: '2020-07-16',
          customer: { __typename: 'ProfileNode', id: 'MOCK-PROFILE-0' },
          harborChoices: [
            { __typename: 'HarborChoiceType', harbor: 'MOCK-HARBOR-0', harborName: 'Testisatama', priority: 0 },
          ],
          id: 'MOCK-APPLICATION-2',
          lease: null,
          municipality: 'Helsinki',
          status: ApplicationStatus.PENDING,
        },
      },
    ],
  },
  boatTypes: [{ __typename: 'BoatTypeType', id: '1', name: 'Purjevene' }],
};

export const mockTableData = getBerthApplicationData(mockData);
