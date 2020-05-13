import { ApplicationDetailsProps } from '../cards/applicationDetails/ApplicationDetails';
import {
  INDIVIDUAL_APPLICATION_berthApplication as BERTH_APPLICATION,
  INDIVIDUAL_APPLICATION_berthApplication_customer as CUSTOMER_PROFILE,
  INDIVIDUAL_APPLICATION_berthApplication_lease as BERTH_LEASE,
  INDIVIDUAL_APPLICATION_boatTypes as BOAT_TYPES,
} from './__generated__/INDIVIDUAL_APPLICATION';
import { CustomerProfileCardProps } from '../cards/customerProfileCard/CustomerProfileCard';
import { CustomerData } from './IndividualApplicationPage';
import { BerthMooringType } from '../../@types/__generated__/globalTypes';
import { FILTERED_CUSTOMERS } from './__generated__/FILTERED_CUSTOMERS';
import { OfferCardProps } from './offerCard/OfferCard';
import { PrivateCustomerDetailsProps } from '../cards/customerProfileCard/privateCustomerDetails/PrivateCustomerDetails';

export const getCustomerProfile = (profile: CUSTOMER_PROFILE): CustomerProfileCardProps => {
  return {
    customerId: profile.id,
    firstName: profile.firstName,
    lastName: profile.lastName,
    primaryAddress: profile.primaryAddress,
    primaryPhone: profile.primaryPhone?.phone,
    primaryEmail: profile.primaryEmail?.email,
    ssn: '', // TODO
  };
};

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

const getApplicantDetails = (berthApplication: BERTH_APPLICATION): PrivateCustomerDetailsProps => {
  const { firstName, lastName, address, zipCode, municipality, phoneNumber, email, customer } = berthApplication;

  return {
    customerId: customer?.id,
    firstName: firstName,
    lastName: lastName,
    primaryAddress: {
      address: address,
      postalCode: zipCode,
      city: municipality,
    },
    primaryPhone: phoneNumber,
    primaryEmail: email,
    showCustomerNameAsLink: customer?.id !== null,
  };
};

export const getApplicationDetailsData = (
  berthApplication: BERTH_APPLICATION,
  boatTypes: BOAT_TYPES[]
): ApplicationDetailsProps & Required<Pick<ApplicationDetailsProps, 'applicant'>> => {
  const harborChoices = berthApplication.harborChoices || [];
  const lease: Lease | null = berthApplication.lease
    ? {
        harborId: berthApplication.lease.berth?.pier.properties?.harbor.id || '',
        harborName: berthApplication.lease.berth?.pier.properties?.harbor.properties?.name || '',
        id: berthApplication.lease.id,
        berthNum: berthApplication.lease.berth?.number.toString(10) || '',
        pierIdentifier: berthApplication.lease.berth?.pier.properties?.identifier || '',
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
    customerId: berthApplication.customer?.id,
    applicant: getApplicantDetails(berthApplication),
    berthSwitch,
    queue: null,
    harborChoices,
    lease,
    boatType: boatTypes.find(({ id }) => id === berthApplication.boatType)?.name,
  };
};

export const getFilteredCustomersData = (data?: FILTERED_CUSTOMERS): CustomerData[] | null => {
  if (!data?.profiles) return null;

  return data.profiles.edges.reduce<CustomerData[]>((acc, edge) => {
    if (!edge?.node) return acc;
    const { id, firstName, lastName, primaryAddress, berthLeases } = edge.node;

    const berths = berthLeases?.edges
      .map((edge) => edge?.node?.berth?.pier.properties?.harbor.properties?.name)
      .join(', ');

    return [
      ...acc,
      {
        id,
        name: `${lastName}, ${firstName}`,
        city: primaryAddress?.city,
        address: primaryAddress?.address,
        berths,
      },
    ];
  }, []);
};

interface LeaseDetails {
  id: string;
  berthComment: string;
  berthDepth: number | null;
  berthIsAccessible: boolean;
  berthLength: number | null;
  berthMooringType: BerthMooringType | null;
  berthNum: string | number;
  berthWidth: number | null;
  electricity: boolean;
  gate: boolean;
  harborName: string;
  lighting: boolean;
  pierIdentifier: string;
  wasteCollection: boolean;
  water: boolean;
}

export const getOfferDetailsData = (lease: BERTH_LEASE): Omit<OfferCardProps, 'handleDeleteLease'> => {
  const leaseDetails: LeaseDetails | null = {
    id: lease.id,
    berthComment: lease.berth?.comment || '',
    berthDepth: lease.berth?.depth || null,
    berthIsAccessible: lease.berth?.isAccessible || false,
    berthLength: lease.berth?.length || null,
    berthMooringType: lease.berth?.mooringType || null,
    berthNum: lease.berth?.number.toString(10) || '',
    berthWidth: lease.berth?.width || null,
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
