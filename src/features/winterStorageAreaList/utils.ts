import { WinterStorageAreaData } from './types';
import { WINTER_STORAGE_AREAS } from './__generated__/WINTER_STORAGE_AREAS';
import { Map } from '../harborList/types';

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

    const maps: Map[] = winterStorageArea.node.properties.maps.reduce<Map[]>((acc, map) => {
      if (map !== null) {
        return acc.concat({
          id: map.id,
          url: map.url,
        });
      }
      return acc;
    }, []);

    const { properties: propertiesNode } = winterStorageArea.node;
    return [
      ...acc,
      {
        id: winterStorageArea.node.id,
        imageFile: propertiesNode.imageFile,
        maps,
        maxWidth: propertiesNode.maxWidth,
        municipality: propertiesNode.municipality,
        name: propertiesNode.name || '-',
        numberOfFreePlaces: propertiesNode.numberOfFreePlaces,
        numberOfMarkedPlaces: propertiesNode.numberOfPlaces,
        servicemapId: propertiesNode.servicemapId,
        streetAddress: propertiesNode.streetAddress,
        wwwUrl: propertiesNode.wwwUrl,
        zipCode: propertiesNode.zipCode,
        ...properties,
      },
    ];
  }, []);
};
