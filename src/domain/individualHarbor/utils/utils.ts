import {
  INDIVIDUAL_HARBOR,
  INDIVIDUAL_HARBOR_harbor_properties as HarborProperties,
} from '../__generated__/INDIVIDUAL_HARBOR';

interface PierProps {
  electricity: boolean;
  gate: boolean;
  lighting: boolean;
  water: boolean;
  wasteCollection: boolean;
}

export type IndividualHarborData = {
  id: string;
  name: string | null;
} & HarborProperties &
  PierProps;

export const getIndividualHarborData = (
  data: INDIVIDUAL_HARBOR | undefined
): IndividualHarborData | null => {
  if (data?.harbor?.properties?.piers) {
    const pierProps = data.harbor.properties.piers.edges.reduce(
      (prev, pier) => {
        if (pier?.node?.properties) {
          return {
            electricity: prev.electricity || pier.node.properties.electricity,
            gate: prev.gate || pier.node.properties.gate,
            lighting: prev.lighting || pier.node.properties.lighting,
            wasteCollection:
              prev.wasteCollection || pier.node.properties.wasteCollection,
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
    return {
      id: data.harbor.id,
      ...data.harbor.properties,
      ...pierProps,
    };
  }
  return null;
};

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

export type Berth = {
  number: number;
  identifier: string;
  length: number;
  width: number;
  depth: number | null;
  mooringType: string;
  comment: string;
  leases?: Lease[];
};

export const getBerths = (data: INDIVIDUAL_HARBOR | undefined): Berth[] => {
  if (!data?.harbor?.properties?.piers) return [];

  return data.harbor.properties.piers.edges.reduce<Berth[]>((acc, pierEdge) => {
    if (!pierEdge?.node?.properties) return [];

    const { identifier } = pierEdge.node.properties;
    const berths = pierEdge.node.properties.berths.edges.reduce<Berth[]>(
      (prev, berthEdge) => {
        if (!berthEdge || !berthEdge.node) return prev;

        const leases =
          berthEdge?.node?.leases?.edges.reduce<Lease[]>((acc, leaseEdge) => {
            if (!leaseEdge?.node?.application?.customer) return acc;

            return [
              ...acc,
              {
                startDate: leaseEdge.node.startDate,
                endDate: leaseEdge.node.endDate,
                status: leaseEdge.node.status,
                isActive: leaseEdge.node.isActive,
                customer: {
                  id: leaseEdge.node.application.customer.id,
                  firstName: leaseEdge.node.application.customer.firstName,
                  lastName: leaseEdge.node.application.customer.lastName,
                },
              },
            ];
          }, []) ?? [];

        return [
          ...prev,
          {
            identifier,
            length: berthEdge.node.length,
            mooringType: berthEdge.node.mooringType,
            number: berthEdge.node.number,
            width: berthEdge.node.width,
            depth: berthEdge.node.depth,
            comment: berthEdge.node.comment,
            leases,
          },
        ];
      },
      []
    );

    return [...acc, ...berths];
  }, []);
};

export type Pier = {
  identifier: string;
  electricity: boolean;
  wasteCollection: boolean;
  water: boolean;
  lighting: boolean;
  gate: boolean;
  suitableBoatTypes: string[];
};

export const getPiers = (data: INDIVIDUAL_HARBOR | undefined): Pier[] => {
  if (!data?.harbor?.properties?.piers) return [];

  return data.harbor.properties.piers.edges.reduce<Pier[]>((acc, pierEdge) => {
    if (!pierEdge?.node?.properties) return acc;

    const {
      identifier,
      electricity,
      wasteCollection,
      water,
      lighting,
      gate,
    } = pierEdge.node.properties;

    const suitableBoatTypes = pierEdge.node.properties.suitableBoatTypes.reduce<
      string[]
    >((acc, suitableBoatType) => {
      if (!suitableBoatType.name) return acc;
      return [...acc, suitableBoatType.name];
    }, []);

    return [
      ...acc,
      {
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
