import {
  INDIVIDUAL_WINTER_STORAGE_AREA,
  INDIVIDUAL_WINTER_STORAGE_AREA_winterStorageArea_properties_sections_edges_node_properties as SECTION_PROPERTIES,
  INDIVIDUAL_WINTER_STORAGE_AREA_winterStorageArea_properties_sections_edges_node_properties_places_edges as WINTER_STORAGE_PLACES,
} from './__generated__/INDIVIDUAL_WINTER_STORAGE_AREA';
import { WinterStorageArea, Map, WinterStoragePlace, WinterStorageSection, Lease } from './types';

export const getIndividualWinterStorageArea = (
  data: INDIVIDUAL_WINTER_STORAGE_AREA | undefined
): WinterStorageArea | null => {
  if (!data || !data.winterStorageArea || !data.winterStorageArea.properties) {
    return null;
  }
  const {
    name,
    servicemapId,
    zipCode,
    municipality,
    streetAddress,
    wwwUrl,
    imageFile,
  } = data.winterStorageArea.properties;

  const maps = data.winterStorageArea.properties.maps.reduce<Map[]>((acc, map) => {
    if (map !== null) {
      return acc.concat({
        id: map.id,
        url: map.url,
      });
    }
    return acc;
  }, []);

  const hasService = (service: keyof SECTION_PROPERTIES): boolean => {
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
    servicemapId: servicemapId ?? '',
    electricity: hasService('electricity'),
    water: hasService('water'),
    gate: hasService('gate'),
    summerStorageForBoats: hasService('summerStorageForBoats'),
    summerStorageForTrailers: hasService('summerStorageForTrailers'),
    summerStorageForDockingEquipment: hasService('summerStorageForDockingEquipment'),
    numberOfCustomers: 0, // TODO: this should be resolved from the data once available through the backend
  };
};

const getLeases = (places: WINTER_STORAGE_PLACES) => {
  return places?.node?.leases?.edges.reduce<Lease[]>((acc, leaseEdge) => {
    if (!leaseEdge?.node?.application?.customer) {
      return acc;
    }
    const { status, startDate, endDate } = leaseEdge.node;
    return [
      ...acc,
      {
        customer: {
          id: leaseEdge.node.application.customer.id,
          firstName: leaseEdge.node.application.customer.firstName,
          lastName: leaseEdge.node.application.customer.lastName,
        },
        status,
        startDate,
        endDate,
        isActive: false, // TODO: this should be resolved from the data once available through the backend
      },
    ];
  }, []);
};

const getWinterStoragePlacesFromSectionProperties = (sectionProperties: SECTION_PROPERTIES) => {
  return (
    sectionProperties.places.edges.reduce<WinterStoragePlace[]>((acc, placeEdge) => {
      if (!placeEdge?.node) {
        return acc;
      }
      const leases = getLeases(placeEdge);
      return [
        ...acc,
        {
          id: placeEdge.node.id,
          identifier: sectionProperties.identifier,
          number: placeEdge.node.number,
          width: placeEdge.node.width,
          length: placeEdge.node.length,
          isActive: placeEdge.node.isActive,
          leases,
        },
      ];
    }, []) ?? []
  );
};

export const getWinterStoragePlaces = (data: INDIVIDUAL_WINTER_STORAGE_AREA | undefined): WinterStoragePlace[] => {
  if (!data?.winterStorageArea?.properties) {
    return [];
  }
  return data?.winterStorageArea?.properties?.sections.edges
    .reduce<SECTION_PROPERTIES[]>((acc, sectionEdge) => {
      if (!sectionEdge?.node?.properties) {
        return acc;
      }
      return [...acc, sectionEdge.node.properties];
    }, [])
    .map<WinterStoragePlace[]>(getWinterStoragePlacesFromSectionProperties)
    .reduce<WinterStoragePlace[]>((acc, arr) => [...acc, ...arr], []);
};

export const getWinterStorageSections = (data: INDIVIDUAL_WINTER_STORAGE_AREA | undefined): WinterStorageSection[] => {
  if (!data?.winterStorageArea?.properties) {
    return [];
  }
  return data.winterStorageArea.properties.sections.edges.reduce<WinterStorageSection[]>((acc, sectionEdge) => {
    if (!sectionEdge?.node?.properties?.identifier) {
      return acc;
    }
    return [...acc, { identifier: sectionEdge.node.properties.identifier }];
  }, []);
};
