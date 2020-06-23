import { WinterStorageAreaData } from './types';
import { WINTER_STORAGE_AREAS } from './__generated__/WINTER_STORAGE_AREAS';

interface WinterStorageProperties {
  electricity: number;
  gate: number;
  summerStorageForDockingEquipment: number;
  summerStorageForTrailers: number;
  water: number;
}

export const getWinterStorageAreasData = (data: WINTER_STORAGE_AREAS | undefined) => {
  if (!data?.winterStorageAreas?.edges) return [];

  return data.winterStorageAreas.edges.reduce<WinterStorageAreaData[]>((acc, winterStorageArea) => {
    if (!winterStorageArea?.node?.properties?.sections) return acc;

    const properties = winterStorageArea?.node.properties.sections.edges.reduce<WinterStorageProperties>(
      (prev, section) => {
        if (!section?.node?.properties) return prev;

        return {
          electricity: section.node.properties.electricity ? prev.electricity + 1 : prev.electricity,
          gate: section.node.properties.gate ? prev.gate + 1 : prev.gate,
          summerStorageForDockingEquipment: section.node.properties.summerStorageForDockingEquipment
            ? prev.summerStorageForDockingEquipment + 1
            : prev.summerStorageForDockingEquipment,
          summerStorageForTrailers: section.node.properties.summerStorageForTrailers
            ? prev.summerStorageForTrailers + 1
            : prev.summerStorageForTrailers,
          water: section.node.properties.water ? prev.water + 1 : prev.water,
        };
      },
      {
        electricity: 0,
        gate: 0,
        summerStorageForDockingEquipment: 0,
        summerStorageForTrailers: 0,
        water: 0,
      }
    );

    return [
      ...acc,
      {
        id: winterStorageArea.node.id,
        maxWidth: winterStorageArea.node.properties.maxWidth,
        municipality: winterStorageArea.node.properties.municipality,
        name: winterStorageArea.node.properties.name || '-',
        numberOfFreePlaces: 0, // TODO
        numberOfMarkedPlaces: 0, // TODO
        streetAddress: winterStorageArea.node.properties.streetAddress,
        wwwUrl: winterStorageArea.node.properties.wwwUrl,
        zipCode: winterStorageArea.node.properties.zipCode,
        ...properties,
      },
    ];
  }, []);
};
