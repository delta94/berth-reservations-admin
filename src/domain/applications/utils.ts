import { BERTH_APPLICATIONS } from './__generated__/BERTH_APPLICATIONS';
import { ApplicationStatus } from '../../@types/__generated__/globalTypes';

interface HarborChoice {
  harbor: string;
  harborName: string;
  priority: number;
}

interface Lease {
  berthNum: string | number;
  harborId: string;
  harborName: string;
  id: string;
  pierIdentifier: string;
}

interface BerthSwitch {
  berthNum: string;
  harborId: string;
  harborName: string;
  pierIdentifier: string;
  reason: string | null;
}

export interface ApplicationData {
  id: string;
  isSwitch: boolean;
  customerId?: string;
  berthSwitch: BerthSwitch | null;
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

export const getBerthApplicationData = (data: BERTH_APPLICATIONS | undefined): ApplicationData[] => {
  const boatTypes = data?.boatTypes;

  return (
    data?.berthApplications?.edges.reduce<ApplicationData[]>((acc, application) => {
      if (application?.node) {
        const {
          id,
          customer,
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
            berthNum: lease.berth.number.toString(10) || '',
            harborId: lease.berth.pier.properties.harbor.id,
            harborName: lease.berth.pier.properties.harbor.properties?.name || '',
            id: lease.id,
            pierIdentifier: lease.berth.pier.properties?.identifier || '',
          };
        }

        const berthSwitchProps = berthSwitch && {
          berthNum: berthSwitch.berthNumber,
          harborId: berthSwitch.harbor,
          harborName: berthSwitch.harborName,
          pierIdentifier: berthSwitch.pier,
          reason: berthSwitch.reason?.title || null,
        };

        const applicationData = {
          id,
          customerId: customer?.id,
          isSwitch: !!berthSwitch,
          berthSwitch: berthSwitchProps,
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
    }, []) ?? []
  );
};
