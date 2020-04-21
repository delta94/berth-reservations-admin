export const IndividualHarborQueryData = {
  __type: {
    enumValues: [
      {
        name: 'NO_STERN_TO_MOORING',
        description: 'No stern-to mooring',
        __typename: '__EnumValue',
      },
      {
        name: 'SINGLE_SLIP_PLACE',
        description: 'Single slip place',
        __typename: '__EnumValue',
      },
      {
        name: 'SIDE_SLIP_PLACE',
        description: 'Side slip place',
        __typename: '__EnumValue',
      },
      {
        name: 'STERN_BUOY_PLACE',
        description: 'Stern buoy place',
        __typename: '__EnumValue',
      },
      {
        name: 'STERN_POLE_MOORING',
        description: 'Stern pole mooring',
        __typename: '__EnumValue',
      },
      {
        name: 'QUAYSIDE_MOORING',
        description: 'Quayside mooring',
        __typename: '__EnumValue',
      },
      {
        name: 'DINGHY_PLACE',
        description: 'Dinghy place',
        __typename: '__EnumValue',
      },
      {
        name: 'SEA_BUOY_MOORING',
        description: 'Sea buoy mooring',
        __typename: '__EnumValue',
      },
      {
        name: 'TRAWLER_PLACE',
        description: 'Trawler place',
        __typename: '__EnumValue',
      },
    ],
    __typename: '__Type',
  },
  harbor: {
    id: 'SGFyYm9yTm9kZTo5YThkODMxMy1lYWEyL',
    properties: {
      name: 'Pajalahden venesatama (Meripuistotie) / Venesatama',
      numberOfPlaces: null,
      numberOfFreePlaces: null,
      streetAddress: 'Meripuistotie 1a',
      zipCode: '00210',
      municipality: 'Helsinki',
      wwwUrl:
        'https://www.hel.fi/helsinki/fi/kulttuuri-ja-vapaa-aika/ulkoilu/veneily/kaupungin-venepaikat/kaupungin-venesatamat/pajalahden-venesatama',
      imageFile:
        'https://venepaikka-api.test.hel.ninja/media/harbors/9a8d8313-eaa2-47d2-8f2d-2bb9893f9bc7/41359.jpg',
      servicemapId: '41359',
      piers: {
        edges: [
          {
            node: {
              properties: {
                identifier: '10',
                berths: {
                  edges: [
                    {
                      node: {
                        number: '01',
                        berthType: {
                          width: 250,
                          length: 600,
                          mooringType: 'SINGLE_SLIP_PLACE',
                          __typename: 'BerthTypeNode',
                        },
                        __typename: 'BerthNode',
                      },
                      __typename: 'BerthNodeEdge',
                    },
                    {
                      node: {
                        number: '02',
                        berthType: {
                          width: 350,
                          length: 800,
                          mooringType: 'SIDE_SLIP_PLACE',
                          __typename: 'BerthTypeNode',
                        },
                        __typename: 'BerthNode',
                      },
                      __typename: 'BerthNodeEdge',
                    },
                    {
                      node: {
                        number: '03',
                        berthType: {
                          width: 250,
                          length: 600,
                          mooringType: 'SINGLE_SLIP_PLACE',
                          __typename: 'BerthTypeNode',
                        },
                        __typename: 'BerthNode',
                      },
                      __typename: 'BerthNodeEdge',
                    },
                    {
                      node: {
                        number: '04',
                        berthType: {
                          width: 350,
                          length: 800,
                          mooringType: 'SIDE_SLIP_PLACE',
                          __typename: 'BerthTypeNode',
                        },
                        __typename: 'BerthNode',
                      },
                      __typename: 'BerthNodeEdge',
                    },
                  ],
                  __typename: 'BerthNodeConnection',
                },
                __typename: 'PierProperties',
              },
              __typename: 'PierNode',
            },
            __typename: 'PierNodeEdge',
          },
          {
            node: {
              properties: {
                identifier: '19 b',
                berths: {
                  edges: [
                    {
                      node: {
                        number: '01',
                        berthType: {
                          width: 250,
                          length: 900,
                          mooringType: 'STERN_BUOY_PLACE',
                          __typename: 'BerthTypeNode',
                        },
                        __typename: 'BerthNode',
                      },
                      __typename: 'BerthNodeEdge',
                    },
                    {
                      node: {
                        number: '02',
                        berthType: {
                          width: 300,
                          length: 900,
                          mooringType: 'STERN_BUOY_PLACE',
                          __typename: 'BerthTypeNode',
                        },
                        __typename: 'BerthNode',
                      },
                      __typename: 'BerthNodeEdge',
                    },
                    {
                      node: {
                        number: '03',
                        berthType: {
                          width: 300,
                          length: 900,
                          mooringType: 'STERN_BUOY_PLACE',
                          __typename: 'BerthTypeNode',
                        },
                        __typename: 'BerthNode',
                      },
                      __typename: 'BerthNodeEdge',
                    },
                    {
                      node: {
                        number: '04',
                        berthType: {
                          width: 300,
                          length: 900,
                          mooringType: 'STERN_BUOY_PLACE',
                          __typename: 'BerthTypeNode',
                        },
                        __typename: 'BerthNode',
                      },
                      __typename: 'BerthNodeEdge',
                    },
                    {
                      node: {
                        number: '05',
                        berthType: {
                          width: 300,
                          length: 900,
                          mooringType: 'STERN_BUOY_PLACE',
                          __typename: 'BerthTypeNode',
                        },
                        __typename: 'BerthNode',
                      },
                      __typename: 'BerthNodeEdge',
                    },
                    {
                      node: {
                        number: '06',
                        berthType: {
                          width: 300,
                          length: 900,
                          mooringType: 'STERN_BUOY_PLACE',
                          __typename: 'BerthTypeNode',
                        },
                        __typename: 'BerthNode',
                      },
                      __typename: 'BerthNodeEdge',
                    },
                    {
                      node: {
                        number: '07',
                        berthType: {
                          width: 300,
                          length: 900,
                          mooringType: 'STERN_BUOY_PLACE',
                          __typename: 'BerthTypeNode',
                        },
                        __typename: 'BerthNode',
                      },
                      __typename: 'BerthNodeEdge',
                    },
                    {
                      node: {
                        number: '08',
                        berthType: {
                          width: 300,
                          length: 900,
                          mooringType: 'STERN_BUOY_PLACE',
                          __typename: 'BerthTypeNode',
                        },
                        __typename: 'BerthNode',
                      },
                      __typename: 'BerthNodeEdge',
                    },
                    {
                      node: {
                        number: '09',
                        berthType: {
                          width: 300,
                          length: 900,
                          mooringType: 'STERN_BUOY_PLACE',
                          __typename: 'BerthTypeNode',
                        },
                        __typename: 'BerthNode',
                      },
                      __typename: 'BerthNodeEdge',
                    },
                    {
                      node: {
                        number: '10',
                        berthType: {
                          width: 300,
                          length: 900,
                          mooringType: 'STERN_BUOY_PLACE',
                          __typename: 'BerthTypeNode',
                        },
                        __typename: 'BerthNode',
                      },
                      __typename: 'BerthNodeEdge',
                    },
                    {
                      node: {
                        number: '11',
                        berthType: {
                          width: 300,
                          length: 900,
                          mooringType: 'STERN_BUOY_PLACE',
                          __typename: 'BerthTypeNode',
                        },
                        __typename: 'BerthNode',
                      },
                      __typename: 'BerthNodeEdge',
                    },
                    {
                      node: {
                        number: '12',
                        berthType: {
                          width: 300,
                          length: 900,
                          mooringType: 'STERN_BUOY_PLACE',
                          __typename: 'BerthTypeNode',
                        },
                        __typename: 'BerthNode',
                      },
                      __typename: 'BerthNodeEdge',
                    },
                    {
                      node: {
                        number: '13',
                        berthType: {
                          width: 300,
                          length: 900,
                          mooringType: 'STERN_BUOY_PLACE',
                          __typename: 'BerthTypeNode',
                        },
                        __typename: 'BerthNode',
                      },
                      __typename: 'BerthNodeEdge',
                    },
                    {
                      node: {
                        number: '14',
                        berthType: {
                          width: 300,
                          length: 900,
                          mooringType: 'STERN_BUOY_PLACE',
                          __typename: 'BerthTypeNode',
                        },
                        __typename: 'BerthNode',
                      },
                      __typename: 'BerthNodeEdge',
                    },
                    {
                      node: {
                        number: '15',
                        berthType: {
                          width: 300,
                          length: 900,
                          mooringType: 'STERN_BUOY_PLACE',
                          __typename: 'BerthTypeNode',
                        },
                        __typename: 'BerthNode',
                      },
                      __typename: 'BerthNodeEdge',
                    },
                    {
                      node: {
                        number: '16',
                        berthType: {
                          width: 300,
                          length: 900,
                          mooringType: 'STERN_BUOY_PLACE',
                          __typename: 'BerthTypeNode',
                        },
                        __typename: 'BerthNode',
                      },
                      __typename: 'BerthNodeEdge',
                    },
                  ],
                  __typename: 'BerthNodeConnection',
                },
                __typename: 'PierProperties',
              },
              __typename: 'PierNode',
            },
            __typename: 'PierNodeEdge',
          },
        ],
        __typename: 'PierNodeConnection',
      },
      __typename: 'HarborProperties',
    },
    __typename: 'HarborNode',
  },
};
