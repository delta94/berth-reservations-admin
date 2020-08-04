import {
  INDIVIDUAL_WINTER_STORAGE_AREA,
  INDIVIDUAL_WINTER_STORAGE_AREA_winterStorageArea_properties_sections_edges_node_properties as SectionProperties,
} from './__generated__/INDIVIDUAL_WINTER_STORAGE_AREA';
import { WinterStorageArea, Map, WinterStorageCustomer } from './types';

export const getIndividualWinterStorageArea = (
  data: INDIVIDUAL_WINTER_STORAGE_AREA | undefined
): WinterStorageArea | null => {
  if (!data || !data.winterStorageArea || !data.winterStorageArea.properties) {
    return null;
  }
  const { name, zipCode, municipality, streetAddress, wwwUrl, imageFile } = data.winterStorageArea.properties;

  const maps = data.winterStorageArea.properties.maps.reduce<Map[]>((acc, map) => {
    if (map !== null) {
      return acc.concat({
        id: map.id,
        url: map.url,
      });
    }
    return acc;
  }, []);

  const hasService = (service: keyof SectionProperties): boolean => {
    return (
      data.winterStorageArea?.properties?.sections.edges.some((edge) => edge?.node?.properties?.[service]) ?? false
    );
  };

  return {
    name: name ?? '',
    zipCode,
    municipality,
    streetAddress,
    wwwUrl,
    imageFile,
    maps,
    electricity: hasService('electricity'),
    water: hasService('water'),
    gate: hasService('gate'),
    summerStorageForBoats: hasService('summerStorageForBoats'),
    summerStorageForTrailers: hasService('summerStorageForTrailers'),
    summerStorageForDockingEquipment: hasService('summerStorageForDockingEquipment'),
    numberOfCustomers: 0, // TODO: this should be resolved from the data once available through the backend
  };
};

export const getCustomers = (data: INDIVIDUAL_WINTER_STORAGE_AREA | undefined): WinterStorageCustomer[] => {
  return [{ id: 'placehold', name: 'placeholder' }];
};
