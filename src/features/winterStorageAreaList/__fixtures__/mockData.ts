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
            maxWidth: null,
            municipality: null,
            name: null,
            streetAddress: null,
            wwwUrl: 'https://www.hel.fi/',
            zipCode: '00100',
            sections: {
              __typename: 'WinterStorageSectionNodeConnection',
              edges: [
                {
                  __typename: 'WinterStorageSectionNodeEdge',
                  node: {
                    __typename: 'WinterStorageSectionNode',
                    id: '00',
                    properties: {
                      __typename: 'WinterStorageSectionProperties',
                      electricity: false,
                      gate: false,
                      summerStorageForDockingEquipment: false,
                      summerStorageForTrailers: false,
                      water: false,
                    },
                  },
                },
              ],
            },
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
            name: 'Pursilahdenranta',
            maxWidth: 5,
            municipality: 'Helsinki',
            streetAddress: 'Pursilahdenranta 1',
            wwwUrl: 'https://www.hel.fi/',
            zipCode: '00990',
            sections: {
              __typename: 'WinterStorageSectionNodeConnection',
              edges: [
                {
                  __typename: 'WinterStorageSectionNodeEdge',
                  node: {
                    __typename: 'WinterStorageSectionNode',
                    id: '10',
                    properties: {
                      __typename: 'WinterStorageSectionProperties',
                      electricity: true,
                      gate: true,
                      summerStorageForDockingEquipment: true,
                      summerStorageForTrailers: true,
                      water: true,
                    },
                  },
                },
              ],
            },
          },
        },
      },
    ],
  },
};
