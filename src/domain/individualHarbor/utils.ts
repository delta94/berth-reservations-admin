import {
  INDIVIDUAL_HARBOR,
  INDIVIDUAL_HARBOR_harbor_properties, // eslint-disable-line
} from './__generated__/INDIVIDUAL_HARBOR';

export type IndividualHarborData = {
  id: string;
  name: string | null;
} & INDIVIDUAL_HARBOR_harbor_properties; // eslint-disable-line

export const getIndividualHarborData = (
  data: INDIVIDUAL_HARBOR | undefined
): IndividualHarborData | null => {
  if (data && data.harbor && data.harbor.properties) {
    return { id: data.harbor.id, ...data.harbor.properties };
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
  if (data && data.harbor && data.harbor.properties) {
    return data.harbor.properties.piers.edges.reduce<Berth[]>(
      (acc, pierEdge) => {
        if (pierEdge && pierEdge.node && pierEdge.node.properties) {
          const identifier = pierEdge.node.properties.identifier;
          const berths = pierEdge.node.properties.berths.edges.reduce<Berth[]>(
            (prev, berthEdge) => {
              if (berthEdge && berthEdge.node) {
                const mooringType = berthEdge.node.berthType.mooringType;
                const mooring =
                  data.__type &&
                  data.__type.enumValues &&
                  data.__type.enumValues.find(
                    mooring => mooring.name === mooringType
                  );
                return [
                  ...prev,
                  {
                    identifier,
                    length: `${berthEdge.node.berthType.length / 100} m`,
                    mooring:
                      mooring && mooring.description ? mooring.description : '',
                    number: berthEdge.node.number,
                    width: `${berthEdge.node.berthType.width / 100} m`,
                  },
                ];
              }
              return prev;
            },
            []
          );

          return [...acc, ...berths];
        }
        return [];
      },
      []
    );
  }
  return [];
};
