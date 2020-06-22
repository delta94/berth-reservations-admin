import { WinterStorageAreaData } from './types';
import { WINTER_STORAGE_AREAS } from './__generated__/WINTER_STORAGE_AREAS';

export const getWinterStorageAreasData = (data: WINTER_STORAGE_AREAS | undefined) => {
  if (data?.winterStorageAreas?.edges) {
    return data.winterStorageAreas.edges.reduce<WinterStorageAreaData[]>((acc, winterStorageArea) => {
      if (winterStorageArea?.node?.properties) {
        return [
          ...acc,
          {
            id: winterStorageArea.node.id,
            name: winterStorageArea.node.properties.name || '-',
          },
        ];
      }
      return acc;
    }, []);
  }
  return [];
};
