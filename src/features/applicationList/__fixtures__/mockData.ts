import { BERTH_APPLICATIONS } from '../__generated__/BERTH_APPLICATIONS';
import { getBerthApplicationData } from '../utils';
import { ApplicationStatus } from '../../../@types/__generated__/globalTypes';

export const mockData: BERTH_APPLICATIONS = {
  berthApplications: {
    __typename: 'BerthApplicationNodeConnection',
    count: 2,
    edges: [
      {
        __typename: 'BerthApplicationNodeEdge',
        node: {
          __typename: 'BerthApplicationNode',
          accessibilityRequired: false,
          berthSwitch: {
            __typename: 'BerthSwitchType',
            berthNumber: '1',
            harbor: '123',
            harborName: 'Testisatama',
            id: '0',
            pier: 'Testilaituri',
            reason: { __typename: 'BerthSwitchReasonType', title: 'Syy' },
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
          customer: { __typename: 'ProfileNode', id: '1' },
          harborChoices: [{ __typename: 'HarborChoiceType', harbor: '1', harborName: '1', priority: 0 }],
          id: '0',
          lease: {
            __typename: 'BerthLeaseNode',
            berth: {
              __typename: 'BerthNode',
              number: 0,
              pier: {
                __typename: 'PierNode',
                properties: {
                  __typename: 'PierProperties',
                  harbor: {
                    __typename: 'HarborNode',
                    id: '0',
                    properties: { __typename: 'HarborProperties', name: 'Harbor' },
                  },
                  identifier: 'Testilaituri',
                },
              },
            },
            id: '0',
          },
          municipality: 'Helsinki',
          status: ApplicationStatus.PENDING,
        },
      },
      {
        __typename: 'BerthApplicationNodeEdge',
        node: {
          __typename: 'BerthApplicationNode',
          accessibilityRequired: false,
          berthSwitch: null,
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
          harborChoices: [{ __typename: 'HarborChoiceType', harbor: '1', harborName: '1', priority: 0 }],
          id: '1',
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
