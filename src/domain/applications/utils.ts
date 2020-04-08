import { BERTH_APPLICATIONS } from './__generated__/BERTH_APPLICATIONS';
import { ApplicationStatus } from '../../@types/__generated__/globalTypes';

interface HarborChoice {
  harbor: string;
  harborName: string;
  priority: number;
}

interface Lease {
  id: string;
  harborName: string;
  harborId: string;
  pierIdentifier: string;
  berthNum: string;
}

export interface ApplicationData {
  id: string;
  isSwitch: boolean;
  queue: number | null;
  createdAt: string;
  municipality: string;
  status: ApplicationStatus;
  lease: Lease | null;
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

export const getBerthApplicationData = (
  data: BERTH_APPLICATIONS | undefined
): ApplicationData[] => {
  const boatTypes = data?.boatTypes;

  return (
    data?.berthApplications?.edges.reduce<ApplicationData[]>(
      (acc, application) => {
        if (application?.node) {
          const {
            id,
            berthSwitch,
            createdAt,
            municipality,
            status,
            lease,
            boatDraught,
            boatRegistrationNumber,
            boatModel,
            boatName,
            boatWidth,
            boatLength,
            boatType,
            boatWeight,
            harborChoices = [],
            accessibilityRequired,
          } = application.node;
          let leaseProps: Lease | null = null;

          if (lease?.berth?.pier.properties?.harbor) {
            leaseProps = {
              id: lease.id,
              harborId: lease.berth.pier.properties.harbor.id,
              harborName:
                lease.berth.pier.properties.harbor.properties?.name || '',
              pierIdentifier: lease.berth.pier.properties?.identifier || '',
              berthNum: lease.berth.number || '',
            };
          }

          const applicationData = {
            id,
            isSwitch: !!berthSwitch,
            queue: null,
            createdAt,
            municipality,
            status,
            lease: leaseProps,
            boatRegistrationNumber,
            boatModel,
            boatName,
            boatWidth,
            boatLength,
            boatDraught,
            boatWeight,
            boatType: boatTypes?.find(({ id }) => id === boatType)?.name,
            harborChoices: harborChoices || [],
            accessibilityRequired,
          };
          return [...acc, applicationData];
        }
        return acc;
      },
      []
    ) ?? []
  );
};
