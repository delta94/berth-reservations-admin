import { OFFER } from './__generated__/OFFER';
import { LeaseStatus } from '../../@types/__generated__/globalTypes';
import { HarborCardProps } from '../../common/harborCard/HarborCard';
import { Boat } from '../../common/boatCard/types';

interface Lease {
  customer: {
    id: string;
    firstName: string;
    lastName: string;
  };
  status: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export interface BerthData {
  id: string;
  harborId: string;
  harbor: string;
  pier: string;
  berth: string | number;
  berthId: string;
  width: number | null;
  length: number | null;
  draught: number | null;
  mooringType: string;
  leases: Lease[];
  comment: string;
  properties: {
    lighting: boolean | null;
    water: boolean | null;
    gate: boolean | null;
    electricity: boolean | null;
    wasteCollection: boolean | null;
    isAccessible: boolean | null;
  };
}

export const getOfferData = (data: OFFER | undefined): BerthData[] => {
  if (!data?.harborByServicemapId?.properties?.piers) return [];

  const harborId = data.harborByServicemapId.id;
  const harbor = data.harborByServicemapId.properties.name || '';
  const allBerths = data.harborByServicemapId.properties.piers.edges.reduce<BerthData[]>((acc, pier) => {
    if (!pier?.node?.properties) return acc;

    const { properties } = pier.node;
    const berths = pier.node.properties.berths.edges.reduce<BerthData[]>((acc, berth) => {
      if (!berth?.node) return acc;

      const leases =
        berth.node.leases?.edges.reduce<Lease[]>((acc, edge) => {
          if (!edge?.node || edge?.node?.status !== LeaseStatus.PAID) return acc;

          return [
            ...acc,
            {
              startDate: edge.node.startDate,
              endDate: edge.node.endDate,
              status: edge.node.status,
              isActive: edge.node.isActive,
              customer: {
                id: edge.node.customer.id,
                firstName: edge.node.customer.firstName,
                lastName: edge.node.customer.lastName,
              },
            },
          ];
        }, []) ?? [];

      return [
        ...acc,
        {
          id: berth.node.id,
          harborId,
          harbor,
          pier: properties.identifier,
          berth: berth.node.number.toString(10),
          berthId: berth.node.id,
          width: berth.node.width,
          length: berth.node.length,
          draught: berth.node.depth,
          mooringType: berth.node.mooringType,
          leases,
          comment: berth.node.comment,
          properties: {
            lighting: properties.lighting,
            water: properties.water,
            gate: properties.gate,
            electricity: properties.electricity,
            wasteCollection: properties.wasteCollection,
            isAccessible: berth.node.isAccessible,
          },
        },
      ];
    }, []);

    return [...acc, ...berths];
  }, []);

  return allBerths;
};

interface PierTab {
  label: string;
  value: string;
  disabled: boolean;
}

export const getAllPiersIdentifiers = (data: OFFER | undefined): PierTab[] => {
  const piers = data?.harborByServicemapId?.properties?.piers?.edges ?? [];

  return piers.reduce<PierTab[]>((acc, pier) => {
    if (!pier?.node?.properties) return acc;

    const pierTab = {
      label: pier.node.properties.identifier,
      value: pier.node.properties.identifier,
      disabled: !pier.node.properties?.berths.edges.length,
    };

    return [...acc, pierTab];
  }, []);
};

type Map = {
  id: string;
  url: string;
};

export const getHarbor = (data: OFFER | undefined): HarborCardProps | null => {
  if (
    !data ||
    !data.harborByServicemapId ||
    !data.harborByServicemapId.properties ||
    !data.harborByServicemapId.properties.piers
  ) {
    return null;
  }

  const pierProps = data.harborByServicemapId.properties.piers.edges.reduce(
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

  const maps = data.harborByServicemapId.properties.maps.reduce<Map[]>((acc, map) => {
    if (map !== null) {
      return acc.concat({
        id: map.id,
        url: map.url,
      });
    }
    return acc;
  }, []);

  return {
    imageUrl: data.harborByServicemapId.properties.imageFile,
    maps,
    name: data.harborByServicemapId.properties.name || '',
    address: `${data.harborByServicemapId.properties.streetAddress} ${data.harborByServicemapId.properties.municipality} ${data.harborByServicemapId.properties.zipCode}`,
    servicemapId: data.harborByServicemapId.properties.servicemapId || '',
    properties: {
      ...pierProps,
      queue: data.harborByServicemapId.properties.numberOfPlaces, // TODO
      numberOfPlaces: data.harborByServicemapId.properties.numberOfPlaces,
      numberOfFreePlaces: data.harborByServicemapId.properties.numberOfFreePlaces,
      maxWidth: data.harborByServicemapId.properties.maxWidth || 0,
    },
  };
};

export const getBoat = (data: OFFER | undefined): Boat | null => {
  if (!data || !data.berthApplication) return null;

  const boatTypes = data.boatTypes;
  const {
    boatType,
    boatRegistrationNumber,
    boatName,
    boatModel,
    boatWidth,
    boatLength,
    boatDraught,
    boatWeight,
  } = data.berthApplication;
  return {
    boatType: boatTypes?.find(({ id }) => id === boatType)?.name ?? null,
    boatRegistrationNumber,
    boatName,
    boatModel,
    boatWidth,
    boatLength,
    boatDraught,
    boatWeight,
  };
};
