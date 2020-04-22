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

export type Berth = {
  number: string;
  identifier: string;
  length: number;
  width: number;
  mooringType: string;
};

export const getBerths = (data: INDIVIDUAL_HARBOR | undefined) => {
  if (!data?.harbor?.properties?.piers) return [];

  return data.harbor.properties.piers.edges.reduce<Berth[]>((acc, pierEdge) => {
    if (!pierEdge?.node?.properties) return [];

    const { identifier } = pierEdge.node.properties;
    const berths = pierEdge.node.properties.berths.edges.reduce<Berth[]>(
      (prev, berthEdge) => {
        if (!berthEdge || !berthEdge.node) return prev;

        return [
          ...prev,
          {
            identifier,
            length: berthEdge.node.berthType.length,
            mooringType: berthEdge.node.berthType.mooringType,
            number: berthEdge.node.number.toString(10),
            width: berthEdge.node.berthType.width,
          },
        ];
      },
      []
    );

    return [...acc, ...berths];
  }, []);
};
