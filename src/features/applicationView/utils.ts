import { ApplicationDetailsProps } from '../../common/applicationDetails/ApplicationDetails';
import {
  INDIVIDUAL_APPLICATION_berthApplication as BERTH_APPLICATION,
  INDIVIDUAL_APPLICATION_berthApplication_customer as CUSTOMER_PROFILE,
  INDIVIDUAL_APPLICATION_boatTypes as BOAT_TYPES,
} from './__generated__/INDIVIDUAL_APPLICATION';
import { CustomerProfileCardProps } from '../../common/customerProfileCard/CustomerProfileCard';
import { CustomerData } from './ApplicationView';
import { BerthApplicationLanguage, CustomerGroup, Language } from '../../@types/__generated__/globalTypes';
import { FILTERED_CUSTOMERS } from './__generated__/FILTERED_CUSTOMERS';

export const getCustomerProfile = (profile: CUSTOMER_PROFILE): CustomerProfileCardProps => {
  return {
    customerId: profile.id,
    firstName: profile.firstName,
    lastName: profile.lastName,
    primaryAddress: profile.primaryAddress,
    primaryPhone: profile.primaryPhone?.phone,
    primaryEmail: profile.primaryEmail?.email,
    ssn: '-', // TODO
    language: profile.language,
    showCustomerNameAsLink: true,
    customerGroup: profile.customerGroup,
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

const mapBerthApplicationLanguageToLanguage = (berthApplicationLanguage: BerthApplicationLanguage): Language | null => {
  switch (berthApplicationLanguage) {
    case BerthApplicationLanguage.FI:
      return Language.FINNISH;
    case BerthApplicationLanguage.SV:
      return Language.SWEDISH;
    case BerthApplicationLanguage.EN:
      return Language.ENGLISH;
    default:
      return null;
  }
};

const getApplicantDetails = (berthApplication: BERTH_APPLICATION): CustomerProfileCardProps => {
  const {
    firstName,
    lastName,
    address,
    zipCode,
    municipality,
    phoneNumber,
    email,
    businessId,
    companyName,
    language,
  } = berthApplication;
  const customerGroup = businessId ? CustomerGroup.COMPANY : CustomerGroup.PRIVATE;

  return {
    firstName: firstName,
    lastName: lastName,
    primaryAddress: {
      address: address,
      postalCode: zipCode,
      city: municipality,
    },
    primaryPhone: phoneNumber,
    primaryEmail: email,
    language: mapBerthApplicationLanguageToLanguage(language),
    customerGroup,
    ...(businessId && {
      organization: {
        businessId,
        name: companyName,
        address,
        city: municipality,
        postalCode: zipCode,
      },
    }),
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

export const getFilteredCustomersData = (data?: FILTERED_CUSTOMERS): CustomerData[] => {
  if (!data?.profiles) return [];

  return data.profiles.edges.reduce<CustomerData[]>((acc, edge) => {
    if (!edge?.node) return acc;
    const { id, firstName, lastName, primaryAddress, berthLeases, customerGroup } = edge.node;

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
        customerGroup,
      },
    ];
  }, []);
};
