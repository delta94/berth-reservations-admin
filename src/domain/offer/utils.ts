import { OFFER_PAGE } from './__generated__/OFFER_PAGE';

export interface BerthData {
  harborId: string;
  harbor: string;
  pier: string;
  berth: string;
  berthId: string;
  width: number | null;
  length: number | null;
  draught: number | null;
  mooringType: string;
}

export const getOfferData = (data: OFFER_PAGE | undefined): BerthData[] => {
  if (!data?.harborByServicemapId?.properties?.piers) return [];

  const harborId = data.harborByServicemapId.id;
  const harbor = data.harborByServicemapId.properties.name || '';
  const allBerths = data.harborByServicemapId.properties.piers.edges.reduce<
    BerthData[]
  >((acc, pier) => {
    if (!pier?.node?.properties) return acc;

    const pierIdentifier = pier.node.properties.identifier;
    const berths = pier.node.properties.berths.edges.reduce<BerthData[]>(
      (acc, berth) => {
        if (!berth?.node) return acc;

        return [
          ...acc,
          {
            harborId,
            harbor,
            pier: pierIdentifier,
            berth: berth.node.number,
            berthId: berth.node.id,
            width: berth.node.berthType.width,
            length: berth.node.berthType.length,
            draught: null,
            mooringType: berth.node.berthType.mooringType,
          },
        ];
      },
      []
    );

    return [...acc, ...berths];
  }, []);

  return allBerths;
};

export const getAllPiersIdentifiers = (
  data: OFFER_PAGE | undefined
): string[] => {
  const piers = data?.harborByServicemapId?.properties?.piers?.edges ?? [];

  return piers.reduce<string[]>((acc, pier) => {
    const identifier = pier?.node?.properties?.identifier;

    if (!identifier || (identifier && acc.includes(identifier))) return acc;

    return [...acc, identifier];
  }, []);
};
