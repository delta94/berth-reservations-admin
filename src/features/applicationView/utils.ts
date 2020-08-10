import { ApplicationDetailsProps } from '../../common/applicationDetails/ApplicationDetails';
import {
  INDIVIDUAL_APPLICATION_berthApplication as BERTH_APPLICATION,
  INDIVIDUAL_APPLICATION_berthApplication_customer as CUSTOMER_PROFILE,
  INDIVIDUAL_APPLICATION_boatTypes as BOAT_TYPES,
} from './__generated__/INDIVIDUAL_APPLICATION';
import { CustomerProfileCardProps } from '../../common/customerProfileCard/CustomerProfileCard';
import { BerthApplicationLanguage, CustomerGroup, Language } from '../../@types/__generated__/globalTypes';

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

export const mapBerthApplicationLanguageToLanguage = (
  berthApplicationLanguage: BerthApplicationLanguage
): Language | null => {
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
  const {
    accessibilityRequired,
    boatDraught,
    boatLength,
    boatModel,
    boatName,
    boatRegistrationNumber,
    boatWeight,
    boatWidth,
    createdAt,
    harborChoices,
    id,
    status,
  } = berthApplication;
  const lease: Lease | null = berthApplication.lease
    ? {
        harborId: berthApplication.lease.berth.pier.properties?.harbor.id || '',
        harborName: berthApplication.lease.berth.pier.properties?.harbor.properties?.name || '',
        id: berthApplication.lease.id,
        berthNum: berthApplication.lease.berth.number.toString(10),
        pierIdentifier: berthApplication.lease.berth.pier.properties?.identifier || '',
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
    accessibilityRequired,
    applicant: getApplicantDetails(berthApplication),
    berthSwitch,
    boatDraught,
    boatLength,
    boatModel,
    boatName,
    boatRegistrationNumber,
    boatType: boatTypes.find(({ id }) => id === berthApplication.boatType)?.name,
    boatWeight,
    boatWidth,
    createdAt,
    customerId: berthApplication.customer?.id,
    harborChoices: harborChoices || [],
    id,
    lease,
    queue: null,
    status,
  };
};
