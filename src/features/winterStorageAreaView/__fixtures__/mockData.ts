import { INDIVIDUAL_WINTER_STORAGE_AREA } from '../__generated__/INDIVIDUAL_WINTER_STORAGE_AREA';

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
        edges: [],
        __typename: 'WinterStorageSectionNodeConnection',
      },
      __typename: 'WinterStorageAreaProperties',
    },
    __typename: 'WinterStorageAreaNode',
  },
};
