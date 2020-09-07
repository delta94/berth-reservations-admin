import {
  INDIVIDUAL_WINTER_STORAGE_AREA,
  INDIVIDUAL_WINTER_STORAGE_AREA_winterStorageArea_properties_sections as SECTIONS,
  INDIVIDUAL_WINTER_STORAGE_AREA_winterStorageArea_properties_sections_edges_node as SECTION,
  INDIVIDUAL_WINTER_STORAGE_AREA_winterStorageArea_properties_sections_edges_node_properties as SECTION_PROPERTIES,
  INDIVIDUAL_WINTER_STORAGE_AREA_winterStorageArea_properties_sections_edges_node_properties_leases as LEASES,
  // eslint-disable-next-line max-len
  INDIVIDUAL_WINTER_STORAGE_AREA_winterStorageArea_properties_sections_edges_node_properties_places_edges as WINTER_STORAGE_PLACES,
  INDIVIDUAL_WINTER_STORAGE_AREA_winterStorageArea_properties_sections_edges_node_properties_places_edges_node as PLACE,
} from './__generated__/INDIVIDUAL_WINTER_STORAGE_AREA';
import {
  WinterStorageArea,
  Map,
  WinterStoragePlace,
  WinterStorageSection,
  Lease,
  MarkedWinterStorage,
  UnmarkedWinterStorage,
} from './types';

const getNumberOfCustomersForPlace = (place: PLACE): number => {
  const isActive = place?.leases?.edges?.find((edge) => edge?.node?.isActive);
  return isActive ? 1 : 0;
};

const getNumberOfCustomersForSection = (section: SECTION) => {
  const countPerPlace =
    section?.properties?.places.edges.map((edge) => (edge?.node ? getNumberOfCustomersForPlace(edge.node) : 0)) || [];

  return countPerPlace.reduce((a, b) => {
    return a + b;
  }, 0);
};

const getNumberOfCustomers = (sections: SECTIONS) => {
  const countPerSection =
    sections.edges.map((edge) => (edge?.node ? getNumberOfCustomersForSection(edge.node) : 0)) || [];

  return countPerSection.reduce((a, b) => {
    return a + b;
  }, 0);
};

export const getIndividualWinterStorageArea = (
  data: INDIVIDUAL_WINTER_STORAGE_AREA | undefined
): WinterStorageArea | null => {
  if (!data || !data.winterStorageArea || !data.winterStorageArea.properties) {
    return null;
  }
  const { name, zipCode, municipality, streetAddress, wwwUrl, imageFile, sections } = data.winterStorageArea.properties;

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
    electricity: hasService('electricity'),
    water: hasService('water'),
    gate: hasService('gate'),
    summerStorageForBoats: hasService('summerStorageForBoats'),
    summerStorageForTrailers: hasService('summerStorageForTrailers'),
    summerStorageForDockingEquipment: hasService('summerStorageForDockingEquipment'),
    numberOfCustomers: getNumberOfCustomers(sections),
  };
};

const getLeases = (leases: LEASES): Lease[] => {
  return leases?.edges.reduce<Lease[]>((acc, leaseEdge) => {
    if (!leaseEdge?.node?.application?.customer) {
      return acc;
    }
    const { id, status, startDate, endDate, isActive } = leaseEdge.node;
    return [
      ...acc,
      {
        id,
        customer: {
          id: leaseEdge.node.application.customer.id,
          firstName: leaseEdge.node.application.customer.firstName,
          lastName: leaseEdge.node.application.customer.lastName,
        },
        status,
        applicationId: leaseEdge.node.application.id,
        applicationDate: leaseEdge.node.application.createdAt,
        startDate,
        endDate,
        isActive,
      },
    ];
  }, []);
};

const getLeasesForPlaces = (places: WINTER_STORAGE_PLACES): Lease[] => {
  return places?.node?.leases ? getLeases(places.node.leases) : [];
};

const getWinterStorageLeasesFromSectionProperties = (sectionProperties: SECTION_PROPERTIES) => {
  return sectionProperties?.leases ? getLeases(sectionProperties.leases) : [];
};

const getWinterStoragePlacesFromSectionProperties = (sectionProperties: SECTION_PROPERTIES) => {
  return (
    sectionProperties.places.edges.reduce<WinterStoragePlace[]>((acc, placeEdge) => {
      if (!placeEdge?.node) {
        return acc;
      }
      const leases = getLeasesForPlaces(placeEdge);
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

export const getUnmarkedWinterStorageLeases = (data: INDIVIDUAL_WINTER_STORAGE_AREA | undefined): Lease[] => {
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
    .map<Lease[]>(getWinterStorageLeasesFromSectionProperties)
    .reduce<Lease[]>((acc, arr) => [...acc, ...arr], []);
};

const isUnmarkedSection = (section: SECTION) => {
  if (!section?.properties?.leases?.edges) return false;
  return section.properties?.leases?.edges?.length > 0;
};

export const getWinterStorageSections = (
  data: INDIVIDUAL_WINTER_STORAGE_AREA | undefined,
  unmarked: boolean
): WinterStorageSection[] => {
  if (!data?.winterStorageArea?.properties) {
    return [];
  }
  return data.winterStorageArea.properties.sections.edges.reduce<WinterStorageSection[]>((acc, sectionEdge) => {
    if (!sectionEdge?.node?.properties?.identifier) {
      return acc;
    }
    if (unmarked ? !isUnmarkedSection(sectionEdge.node) : isUnmarkedSection(sectionEdge.node)) {
      return acc;
    }
    return [...acc, { identifier: sectionEdge.node.properties.identifier }];
  }, []);
};

export const getMarkedWinterStorage = (
  data: INDIVIDUAL_WINTER_STORAGE_AREA | undefined
): MarkedWinterStorage | undefined => {
  const places = getWinterStoragePlaces(data);
  const sections = getWinterStorageSections(data, false);

  if (places.length === 0) return undefined;
  return {
    places,
    sections,
  };
};

export const getUnmarkedWinterStorage = (
  data: INDIVIDUAL_WINTER_STORAGE_AREA | undefined
): UnmarkedWinterStorage | undefined => {
  const leases = getUnmarkedWinterStorageLeases(data);

  if (leases.length === 0) return undefined;
  return {
    leases,
  };
};
