import { ApplicationDetailsProps } from '../cards/applicationDetails/ApplicationDetails';
import {
  INDIVIDUAL_APPLICATION_berthApplication as BERTH_APPLICATION,
  INDIVIDUAL_APPLICATION_boatTypes as BOAT_TYPES,
  INDIVIDUAL_APPLICATION_berthApplication_lease as BERTH_LEASE,
} from './__generated__/INDIVIDUAL_APPLICATION';
import { CustomerInfoCardProps } from '../cards/customerInfoCard/CustomerInfoCard';
import { FILTERED_CUSTOMERS } from './__generated__/FILTERED_CUSTOMERS';
import { CustomerData, CUSTOMER_GROUP } from './IndividualApplicationPage';
import { OfferCardProps } from './offerCard/OfferCard';
import { BerthMooringType } from '../../@types/__generated__/globalTypes';

export const getCustomerInfoData = (
  berthApplication: BERTH_APPLICATION
): CustomerInfoCardProps => {
  const {
    firstName,
    lastName,
    address,
    zipCode,
    municipality,
    phoneNumber,
    email,
    customer,
  } = berthApplication;

  return {
    customerId: customer?.id,
    firstName,
    lastName,
    primaryAddress: { address, postalCode: zipCode, city: municipality },
    phone: phoneNumber,
    email,
  };
};

interface Lease {
  berthNum: string;
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

export const getApplicationDetailsData = (
  berthApplication: BERTH_APPLICATION,
  boatTypes: BOAT_TYPES[]
): ApplicationDetailsProps => {
  const harborChoices = berthApplication.harborChoices || [];
  const lease: Lease | null = berthApplication.lease
    ? {
        harborId:
          berthApplication.lease.berth?.pier.properties?.harbor.id || '',
        harborName:
          berthApplication.lease.berth?.pier.properties?.harbor.properties
            ?.name || '',
        id: berthApplication.lease.id,
        berthNum: berthApplication.lease.berth?.number || '',
        pierIdentifier:
          berthApplication.lease.berth?.pier.properties?.identifier || '',
      }
    : null;
  const berthSwitch: BerthSwitch | null = berthApplication.berthSwitch
    ? {
        harborId: berthApplication.berthSwitch.harbor,
        harborName: berthApplication.berthSwitch.harborName,
        berthNum: berthApplication.berthSwitch.berthNumber,
        pierIdentifier: berthApplication.berthSwitch.pier,
        reason: berthApplication.berthSwitch.reason?.title || null,
      }
    : null;

  return {
    ...berthApplication,
    berthSwitch,
    queue: null,
    harborChoices,
    lease,
    boatType: boatTypes.find(({ id }) => id === berthApplication.boatType)
      ?.name,
  };
};

export const getFilteredCustomersData = (
  data?: FILTERED_CUSTOMERS
): CustomerData[] | null => {
  if (!data?.profiles) return null;

  return data.profiles.edges.reduce<CustomerData[]>((acc, edge) => {
    if (!edge?.node) return acc;
    const {
      id,
      firstName,
      lastName,
      primaryAddress,
      company,
      berthLeases,
    } = edge.node;

    const berths = berthLeases?.edges
      .map(edge => edge?.node?.berth?.pier.properties?.harbor.properties?.name)
      .join(', ');

    return [
      ...acc,
      {
        id,
        name: `${lastName}, ${firstName}`,
        city: primaryAddress?.city,
        address: primaryAddress?.address,
        customerGroup: company
          ? CUSTOMER_GROUP.COMPANY
          : CUSTOMER_GROUP.PRIVATE,
        berths,
      },
    ];
  }, []);
};

interface LeaseDetails {
  berthComment: string;
  berthDepth: number | null;
  berthIsAccessible: boolean;
  berthLength: number | null;
  berthMooringType: BerthMooringType | null;
  berthNum: string;
  berthWidth: number | null;
  electricity: boolean;
  gate: boolean;
  harborName: string;
  lighting: boolean;
  pierIdentifier: string;
  wasteCollection: boolean;
  water: boolean;
}

export const getOfferDetailsData = (lease: BERTH_LEASE): OfferCardProps => {
  const leaseDetails: LeaseDetails | null = {
    berthComment: lease.berth?.comment || '',
    berthDepth: lease.berth?.berthType.depth || null,
    berthIsAccessible: lease.berth?.isAccessible || false,
    berthLength: lease.berth?.berthType.length || null,
    berthMooringType: lease.berth?.berthType.mooringType || null,
    berthNum: lease.berth?.number || '',
    berthWidth: lease.berth?.berthType.width || null,
    electricity: lease.berth?.pier.properties?.electricity || false,
    gate: lease.berth?.pier.properties?.gate || false,
    harborName: lease.berth?.pier.properties?.harbor.properties?.name || '',
    lighting: lease.berth?.pier.properties?.lighting || false,
    pierIdentifier: lease.berth?.pier.properties?.identifier || '',
    wasteCollection: lease.berth?.pier.properties?.wasteCollection || false,
    water: lease.berth?.pier.properties?.water || false,
  };

  return {
    leaseDetails,
  };
};
