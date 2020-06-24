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
            imageFile:
              'https://venepaikka-api.test.hel.ninja/media/harbors/9a8d8313-eaa2-47d2-8f2d-2bb9893f9bc7/41359.jpg',
            maps: [
              {
                __typename: 'WinterStorageAreaMapType',
                id: 'testmap',
                url: 'testmap',
              },
            ],
            maxWidth: null,
            municipality: null,
            name: null,
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
            servicemapId: '',
            streetAddress: null,
            wwwUrl: 'https://www.hel.fi/',
            zipCode: '00100',
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
            imageFile:
              'https://venepaikka-api.test.hel.ninja/media/harbors/9a8d8313-eaa2-47d2-8f2d-2bb9893f9bc7/41359.jpg',
            maps: [
              {
                __typename: 'WinterStorageAreaMapType',
                id: 'testmap',
                url: 'testmap',
              },
            ],
            maxWidth: 5,
            municipality: 'Helsinki',
            name: 'Pursilahdenranta',
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
            servicemapId: '',
            streetAddress: 'Pursilahdenranta 1',
            wwwUrl: 'https://www.hel.fi/',
            zipCode: '00990',
          },
        },
      },
    ],
  },
};
