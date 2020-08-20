import {
  FILTERED_CUSTOMERS,
  FILTERED_CUSTOMERS_profiles_edges_node as PROFILE_NODE,
  FILTERED_CUSTOMERS_profiles_edges_node_berthApplications as BERTH_APPLICATIONS,
  FILTERED_CUSTOMERS_profiles_edges_node_berthLeases as BERTH_LEASES,
  FILTERED_CUSTOMERS_profiles_edges_node_winterStorageLeases as WINTER_STORAGE_LEASES,
} from '../__generated__/FILTERED_CUSTOMERS';
import { CustomerGroup } from '../../../@types/__generated__/globalTypes';

const berthApplications: BERTH_APPLICATIONS = {
  __typename: 'BerthApplicationNodeConnection',
  edges: [
    {
      __typename: 'BerthApplicationNodeEdge',
      node: {
        __typename: 'BerthApplicationNode',
        berthSwitch: {
          __typename: 'BerthSwitchType',
          harborName: 'Test Harbor',
        },
      },
    },
  ],
};

const berthLeases: BERTH_LEASES = {
  __typename: 'BerthLeaseNodeConnection',
  edges: [
    {
      __typename: 'BerthLeaseNodeEdge',
      node: {
        __typename: 'BerthLeaseNode',
        berth: {
          __typename: 'BerthNode',
          number: 1,
          pier: {
            __typename: 'PierNode',
            properties: {
              __typename: 'PierProperties',
              harbor: {
                __typename: 'HarborNode',
                id: 'Rn9dNgRGIT',
                properties: { __typename: 'HarborProperties', name: 'Test Harbor' },
              },
              identifier: 'A',
            },
          },
        },
      },
    },
    {
      __typename: 'BerthLeaseNodeEdge',
      node: null,
    },
  ],
};

const winterStorageLeases: WINTER_STORAGE_LEASES = {
  __typename: 'WinterStorageLeaseNodeConnection',
  edges: [
    {
      __typename: 'WinterStorageLeaseNodeEdge',
      node: {
        __typename: 'WinterStorageLeaseNode',
        area: {
          __typename: 'WinterStorageAreaNode',
          properties: { __typename: 'WinterStorageAreaProperties', name: 'Test winter storage area' },
        },
      },
    },
  ],
};

const mockProfile: PROFILE_NODE = {
  __typename: 'ProfileNode',
  berthApplications: berthApplications,
  berthLeases: berthLeases,
  winterStorageLeases: winterStorageLeases,
  firstName: 'Testi',
  id: 'MOCK-PROFILE',
  lastName: 'Testinen',
  organization: null,
  primaryAddress: { __typename: 'AddressNode', address: 'Testikatu 1', city: 'Helsinki', postalCode: '00100' },
  customerGroup: CustomerGroup.PRIVATE,
};

export const mockFilteredCustomers: FILTERED_CUSTOMERS = {
  profiles: {
    __typename: 'ProfileNodeConnection',
    count: 1,
    edges: [
      {
        __typename: 'ProfileNodeEdge',
        node: mockProfile,
      },
    ],
  },
};
