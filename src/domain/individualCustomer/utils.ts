import { INDIVIDUAL_CUSTOMER_profile as INDIVIDUAL_CUSTOMER_PROFILE } from './__generated__/INDIVIDUAL_CUSTOMER';

interface Lease {
  id: string;
  harbor: { id: string; name: string } | null;
  berthNum: string;
  pierIdentifier: string | null;
  startDate: string;
  endDate: string;
}

export const getLeases = (profile: INDIVIDUAL_CUSTOMER_PROFILE): Lease[] => {
  if (!profile.berthLeases?.edges) return [];

  return profile.berthLeases.edges.reduce<Lease[]>((acc, edge) => {
    if (!edge?.node) return acc;

    const berthNum = edge.node.berth.number;
    const pierIdentifier = edge.node.berth.pier.properties?.identifier || null;
    const harbor = edge.node.berth.pier.properties?.harbor;

    const lease = {
      id: edge.node.id,
      harbor: harbor
        ? {
            id: harbor.id,
            name: harbor.properties?.name || '',
          }
        : null,
      berthNum,
      pierIdentifier,
      startDate: edge.node.startDate,
      endDate: edge.node.endDate,
    };

    return [...acc, lease];
  }, []);
};
