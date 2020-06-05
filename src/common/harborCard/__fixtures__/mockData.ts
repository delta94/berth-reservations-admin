import { HarborCardProps } from '../HarborCard';

export const mockProps: HarborCardProps = {
  address: 'Meripuistotie 1a Helsinki 00210',
  imageUrl: 'https://venepaikka-api.test.hel.ninja/media/harbors/9a8d8313-eaa2-47d2-8f2d-2bb9893f9bc7/41359.jpg',
  maps: [
    {
      id: 'testmap',
      url: 'testmap',
    },
  ],
  name: 'Pajalahden venesatama (Meripuistotie) / Venesatama',
  properties: {
    electricity: true,
    gate: true,
    lighting: true,
    maxWidth: 4,
    numberOfFreePlaces: 2,
    numberOfPlaces: 4,
    queue: 4,
    wasteCollection: true,
    water: true,
  },
  servicemapId: '41359',
};
