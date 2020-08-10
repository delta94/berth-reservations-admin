import { INDIVIDUAL_HARBOR } from './__generated__/INDIVIDUAL_HARBOR';
import { Berth, IndividualHarborData, Lease, Map, Pier } from './types';

export const getIndividualHarborData = (data: INDIVIDUAL_HARBOR | undefined): IndividualHarborData | null => {
  if (data?.harbor?.properties?.piers) {
    const pierProps = data.harbor.properties.piers.edges.reduce(
      (prev, pier) => {
        if (pier?.node?.properties) {
          return {
            electricity: prev.electricity || pier.node.properties.electricity,
            gate: prev.gate || pier.node.properties.gate,
            lighting: prev.lighting || pier.node.properties.lighting,
            wasteCollection: prev.wasteCollection || pier.node.properties.wasteCollection,
            water: prev.water || pier.node.properties.water,
          };
        }
        return prev;
      },
      {
        electricity: false,
        gate: false,
        lighting: false,
        wasteCollection: false,
        water: false,
      }
    );

    const { properties } = data.harbor;

    return {
      id: data.harbor.id,
      name: properties.name,
      numberOfPlaces: properties.numberOfPlaces,
      numberOfFreePlaces: properties.numberOfFreePlaces,
      streetAddress: properties.streetAddress,
      zipCode: properties.zipCode,
      municipality: properties.municipality,
      wwwUrl: properties.wwwUrl,
      imageFile: properties.imageFile,
      servicemapId: properties.servicemapId,
      maxWidth: properties.maxWidth,
      ...pierProps,
    };
  }
  return null;
};

export const getBerths = (data: INDIVIDUAL_HARBOR | undefined): Berth[] => {
  if (!data?.harbor?.properties?.piers) return [];

  return data.harbor.properties.piers.edges.reduce<Berth[]>((acc, pierEdge) => {
    if (!pierEdge?.node?.properties) return [];

    const { identifier } = pierEdge.node.properties;
    const berths = pierEdge.node.properties.berths.edges.reduce<Berth[]>((prev, berthEdge) => {
      if (!berthEdge || !berthEdge.node) return prev;

      const leases =
        berthEdge?.node?.leases?.edges.reduce<Lease[]>((acc, leaseEdge) => {
          if (!leaseEdge?.node) return acc;
          return [...acc, { ...leaseEdge.node }];
        }, []) ?? [];

      return [
        ...prev,
        {
          id: berthEdge.node.id,
          identifier,
          isActive: berthEdge.node.isActive,
          length: berthEdge.node.length,
          mooringType: berthEdge.node.mooringType,
          number: berthEdge.node.number,
          width: berthEdge.node.width,
          depth: berthEdge.node.depth,
          comment: berthEdge.node.comment,
          leases,
        },
      ];
    }, []);

    return [...acc, ...berths];
  }, []);
};

export const getPiers = (data: INDIVIDUAL_HARBOR | undefined): Pier[] => {
  if (!data?.harbor?.properties?.piers) return [];

  return data.harbor.properties.piers.edges.reduce<Pier[]>((acc, pierEdge) => {
    if (!pierEdge?.node?.properties) return acc;

    const { identifier, electricity, wasteCollection, water, lighting, gate } = pierEdge.node.properties;

    const suitableBoatTypes = pierEdge.node.properties.suitableBoatTypes.reduce<string[]>((acc, suitableBoatType) => {
      if (!suitableBoatType.name) return acc;
      return [...acc, suitableBoatType.name];
    }, []);

    return [
      ...acc,
      {
        id: pierEdge.node.id,
        identifier,
        electricity,
        wasteCollection,
        water,
        lighting,
        gate,
        suitableBoatTypes,
      },
    ];
  }, []);
};

export const getMaps = (data: INDIVIDUAL_HARBOR | undefined): Map[] => {
  if (!data?.harbor?.properties?.maps) return [];

  return data.harbor.properties.maps.reduce<Map[]>((acc, map) => {
    if (map !== null) {
      return acc.concat({
        id: map.id,
        url: map.url,
      });
    }
    return acc;
  }, []);
};
