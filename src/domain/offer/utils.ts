import { OFFER_PAGE } from './__generated__/OFFER_PAGE';
import { LeaseStatus } from '../../@types/__generated__/globalTypes';

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

export const getOfferData = (data: OFFER_PAGE | undefined): BerthData[] => {
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

export const getAllPiersIdentifiers = (data: OFFER_PAGE | undefined): PierTab[] => {
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
