import { INDIVIDUAL_CUSTOMER_profile as CUSTOMER_PROFILE } from './__generated__/INDIVIDUAL_CUSTOMER';
import { ApplicationStatus } from '../../@types/__generated__/globalTypes';

interface Lease {
  id: string;
  harbor: { id: string; name: string } | null;
  berthNum: string;
  pierIdentifier: string | null;
  startDate: string;
  endDate: string;
}

export const getLeases = (profile: CUSTOMER_PROFILE): Lease[] => {
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

interface Boat {
  id: string;
  boatType: { id: string; name: string | null };
  registrationNumber: string;
  width: number;
  length: number;
  draught: number | null;
  weight: number | null;
  name: string;
  model: string;
}

interface LargeBoat extends Boat {
  propulsion: string;
  hullMaterial: string;
  boatIsInspected: boolean;
  boatIsInsured: boolean;
}

export const getBoats = (profile: CUSTOMER_PROFILE) => {
  if (!profile.boats) return [];

  const boats = profile.boats.edges.reduce<(Boat | LargeBoat)[]>(
    (acc, edge) => {
      if (!edge?.node) return acc;

      return [...acc, edge.node];
    },
    []
  );

  return boats;
};

interface HarborChoice {
  harbor: string;
  harborName: string;
  priority: number;
}

interface ApplicationLease {
  id: string;
  harborName: string;
  harborId: string;
}

export interface Application {
  id: string;
  isSwitch: boolean;
  createdAt: string;
  queue: number | null;
  status: ApplicationStatus;
  lease: ApplicationLease | null;
  boatType?: string | null;
  boatRegistrationNumber: string;
  boatWidth: number;
  boatLength: number;
  boatDraught: number | null;
  boatWeight: number | null;
  boatName: string;
  boatModel: string;
  harborChoices: Array<HarborChoice | null>;
  accessibilityRequired: boolean;
}

export const getApplications = (profile: CUSTOMER_PROFILE) => {
  return (
    profile.berthApplications?.edges.reduce<Application[]>((acc, edge) => {
      if (edge?.node) {
        const {
          id,
          berthSwitch,
          createdAt,
          status,
          lease,
          boatType,
          boatRegistrationNumber,
          boatWidth,
          boatLength,
          boatDraught,
          boatWeight,
          boatName,
          boatModel,
          harborChoices,
          accessibilityRequired,
        } = edge.node;
        let leaseProps: ApplicationLease | null = null;

        if (lease?.berth?.pier.properties?.harbor) {
          leaseProps = {
            id: lease.id,
            harborId: lease.berth.pier.properties.harbor.id,
            harborName:
              lease.berth.pier.properties.harbor.properties?.name || '',
          };
        }

        const applicationData = {
          id,
          isSwitch: !!berthSwitch,
          queue: null,
          createdAt,
          status,
          lease: leaseProps,
          boatRegistrationNumber,
          boatModel,
          boatName,
          boatWidth,
          boatLength,
          boatDraught,
          boatWeight,
          boatType,
          harborChoices: harborChoices || [],
          accessibilityRequired,
        };

        return [...acc, applicationData];
      }
      return acc;
    }, []) ?? []
  );
};