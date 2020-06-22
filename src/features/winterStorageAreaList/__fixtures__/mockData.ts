import { WINTER_STORAGE_AREAS } from '../__generated__/WINTER_STORAGE_AREAS';

export const mockData: WINTER_STORAGE_AREAS = {
  winterStorageAreas: {
    __typename: 'WinterStorageAreaNodeConnection',
    edges: [
      {
        __typename: 'WinterStorageAreaNodeEdge',
        node: {
          __typename: 'WinterStorageAreaNode',
          id: '0',
          properties: {
            __typename: 'WinterStorageAreaProperties',
            name: null,
          },
        },
      },
      {
        __typename: 'WinterStorageAreaNodeEdge',
        node: {
          __typename: 'WinterStorageAreaNode',
          id: '1',
          properties: {
            __typename: 'WinterStorageAreaProperties',
            name: 'Test WS 1',
          },
        },
      },
    ],
  },
};
