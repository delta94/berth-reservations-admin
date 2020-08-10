import { HARBORS } from '../__generated__/HARBORS';

export const mockData: HARBORS = {
  harbors: {
    __typename: 'HarborNodeConnection',
    edges: [
      {
        __typename: 'HarborNodeEdge',
        node: {
          __typename: 'HarborNode',
          id: 'SGFyYm9yTm9kZTpmN2M2YTQwZjAtOWViMi0zZjgyMTI0YjY0OGI=',
          properties: {
            __typename: 'HarborProperties',
            name: 'Pajalahden venesatama (Meripuistotie) / Venesatama',
            streetAddress: 'Meripuistotie 1a',
            zipCode: '00210',
            municipality: 'Helsinki',
            wwwUrl: 'https://www.hel.fi/',
            imageFile:
              'https://venepaikka-api.test.hel.ninja/media/harbors/9a8d8313-eaa2-47d2-8f2d-2bb9893f9bc7/41359.jpg',
            maps: [],
            maxWidth: 4,
            servicemapId: '41359',
            numberOfPlaces: 4,
            numberOfFreePlaces: 2,
            numberOfInactivePlaces: 1,
            piers: {
              __typename: 'PierNodeConnection',
              edges: [
                {
                  __typename: 'PierNodeEdge',
                  node: {
                    __typename: 'PierNode',
                    id: '2c61dcd0-cbaa-4eb8-8e98-5ae1ca4ba623',
                    properties: {
                      __typename: 'PierProperties',
                      electricity: true,
                      gate: true,
                      lighting: true,
                      wasteCollection: true,
                      water: true,
                    },
                  },
                },
              ],
            },
          },
        },
      },
      {
        __typename: 'HarborNodeEdge',
        node: {
          __typename: 'HarborNode',
          id: 'SGFyYm9yTm9kZTplZDM1Q1ZTgtOGUyYS0zYmQxNDk4NjYzMDI=',
          properties: {
            __typename: 'HarborProperties',
            name: 'Nandelstadhin venesatama',
            streetAddress: 'Lars Sonckin tie 8a',
            zipCode: '00570',
            municipality: 'Helsinki',
            wwwUrl: 'https://www.hel.fi/',
            imageFile:
              'https://venepaikka-api.test.hel.ninja/media/harbors/97c033ad-5470-4225-a49b-03958ce910e1/42225.jpg',
            maps: [],
            maxWidth: 4,
            servicemapId: '42225',
            numberOfPlaces: 4,
            numberOfFreePlaces: 2,
            numberOfInactivePlaces: 1,
            piers: {
              __typename: 'PierNodeConnection',
              edges: [
                {
                  __typename: 'PierNodeEdge',
                  node: {
                    __typename: 'PierNode',
                    id: 'd1b8897d-b008-4c2f-b411-a385c86e6f04',
                    properties: {
                      __typename: 'PierProperties',
                      electricity: false,
                      gate: false,
                      lighting: true,
                      wasteCollection: true,
                      water: false,
                    },
                  },
                },
                {
                  __typename: 'PierNodeEdge',
                  node: {
                    __typename: 'PierNode',
                    id: '30e83026-e87e-48ff-9a6a-0f21f62abeb8',
                    properties: {
                      __typename: 'PierProperties',
                      electricity: true,
                      gate: true,
                      lighting: true,
                      wasteCollection: true,
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
