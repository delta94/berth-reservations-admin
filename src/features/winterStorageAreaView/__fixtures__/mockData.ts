import { INDIVIDUAL_WINTER_STORAGE_AREA } from '../__generated__/INDIVIDUAL_WINTER_STORAGE_AREA';
import { LeaseStatus } from '../../../@types/__generated__/globalTypes';

export const mockData: INDIVIDUAL_WINTER_STORAGE_AREA = {
  winterStorageArea: {
    properties: {
      name: 'WS Area 1',
      zipCode: '00100',
      municipality: 'Helsinki',
      streetAddress: '',
      wwwUrl: '',
      imageFile: null,
      maps: [],
      sections: {
        edges: [
          {
            node: {
              id: 'V2ludGVyU3RvcmFnZVNlY3Rpb25Ob2RlOjI1OTgyMTEyLTllNDktNGUwNy1hYmVjLTZhMTQyMzcyZmZjOQ==',
              properties: {
                identifier: '-',
                electricity: true,
                water: true,
                gate: false,
                summerStorageForBoats: false,
                summerStorageForTrailers: false,
                summerStorageForDockingEquipment: false,
                places: {
                  edges: [
                    {
                      node: {
                        id: 'V2ludGVyU3RvcmFnZVBsYWNlTm9kZTo0YzUzZTY3NC0zMmFjLTRkNTEtYmQzMC0wNTcyMWNjMjUyMTE=',
                        number: 1,
                        width: 3,
                        length: 5,
                        isActive: true,
                        leases: {
                          edges: [
                            {
                              node: {
                                id: 'V2ludGVyU3RvcmFnZUxlYXNlTm9kZTo3ZTU0NjdmMy1jZGJhLTQzMmEtODdiZi05ODBiZTI1ZGFjNzg=',
                                startDate: '2020-09-15',
                                endDate: '2021-06-10',
                                status: LeaseStatus.DRAFTED,
                                application: {
                                  createdAt: '2020-07-17T10:52:57.079036+00:00',
                                  customer: {
                                    id: 'UHJvZmlsZU5vZGU6NWNjYzgyNDUtNmRiOS00YTRiLWI5NTEtNWYxNDQ5YTY5NzY2',
                                    firstName: 'Heikki',
                                    lastName: 'Kinnunen',
                                    __typename: 'ProfileNode',
                                  },
                                  __typename: 'WinterStorageApplicationNode',
                                },
                                __typename: 'WinterStorageLeaseNode',
                              },
                              __typename: 'WinterStorageLeaseNodeEdge',
                            },
                          ],
                          __typename: 'WinterStorageLeaseNodeConnection',
                        },
                        __typename: 'WinterStoragePlaceNode',
                      },
                      __typename: 'WinterStoragePlaceNodeEdge',
                    },
                    {
                      node: {
                        id: 'V2ludGVyU3RvcmFnZVBsYWNlTm9kZTo3OTkzYzAxOC0zMTMwLTRjNTItYjA3Ni1mMGZlN2Q5YjRmYTE=',
                        number: 2,
                        width: 3,
                        length: 5,
                        isActive: true,
                        leases: {
                          edges: [
                            {
                              node: {
                                id: 'V2ludGVyU3RvcmFnZUxlYXNlTm9kZTpjOWNjODAyNi1hZTkzLTRjMTUtYmJiNy1kM2Q1ZjE4ZjViYjA=',
                                startDate: '2020-09-15',
                                endDate: '2021-06-10',
                                status: LeaseStatus.DRAFTED,
                                application: null,
                                __typename: 'WinterStorageLeaseNode',
                              },
                              __typename: 'WinterStorageLeaseNodeEdge',
                            },
                          ],
                          __typename: 'WinterStorageLeaseNodeConnection',
                        },
                        __typename: 'WinterStoragePlaceNode',
                      },
                      __typename: 'WinterStoragePlaceNodeEdge',
                    },
                  ],
                  __typename: 'WinterStoragePlaceNodeConnection',
                },
                __typename: 'WinterStorageSectionProperties',
              },
              __typename: 'WinterStorageSectionNode',
            },
            __typename: 'WinterStorageSectionNodeEdge',
          },
        ],
        __typename: 'WinterStorageSectionNodeConnection',
      },
      __typename: 'WinterStorageAreaProperties',
    },
    __typename: 'WinterStorageAreaNode',
  },
};
