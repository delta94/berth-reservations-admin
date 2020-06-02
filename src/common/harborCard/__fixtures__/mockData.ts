import { HarborCardProps } from '../HarborCard';

export const mockProps: HarborCardProps = {
  imageUrl: null,
  maps: [
    {
      id: 'testmap',
      url: 'testmap',
    },
  ],
  name: 'Testisatama',
  address: 'Testiosoite 1, 00100 Helsinki',
  servicemapId: 'id',
  properties: {
    electricity: false,
    gate: false,
    maxWidth: 5,
    queue: 0,
    numberOfFreePlaces: 5,
    numberOfPlaces: 6,
    water: true,
    wasteCollection: true,
    lighting: true,
  },
};
