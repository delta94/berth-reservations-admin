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
  if (data && data.harbor && data.harbor.properties) {
    const pierProps = data.harbor.properties.piers.edges.reduce(
      (prev, pier) => {
        if (pier && pier.node && pier.node.properties) {
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
  length: string;
  width: string;
  mooring: string;
};

export const getBerths = (data: INDIVIDUAL_HARBOR | undefined) => {
  if (!data || !data.harbor || !data.harbor.properties) return [];

  return data.harbor.properties.piers.edges.reduce<Berth[]>((acc, pierEdge) => {
    if (!pierEdge || !pierEdge.node || !pierEdge.node.properties) return [];

    const identifier = pierEdge.node.properties.identifier;
    const berths = pierEdge.node.properties.berths.edges.reduce<Berth[]>(
      (prev, berthEdge) => {
        if (!berthEdge || !berthEdge.node) return prev;

        const mooringType = berthEdge.node.berthType.mooringType;
        const mooring =
          data.__type &&
          data.__type.enumValues &&
          data.__type.enumValues.find(mooring => mooring.name === mooringType);

        return [
          ...prev,
          {
            identifier,
            length: `${berthEdge.node.berthType.length / 100} m`,
            mooring: mooring && mooring.description ? mooring.description : '',
            number: berthEdge.node.number,
            width: `${berthEdge.node.berthType.width / 100} m`,
          },
        ];
      },
      []
    );

    return [...acc, ...berths];
  }, []);
};
