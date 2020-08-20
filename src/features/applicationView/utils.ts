import { ApplicationDetailsProps } from '../../common/applicationDetails/ApplicationDetails';
import {
  INDIVIDUAL_APPLICATION_berthApplication as BERTH_APPLICATION,
  INDIVIDUAL_APPLICATION_boatTypes as BOAT_TYPES,
} from './__generated__/INDIVIDUAL_APPLICATION';
import { INDIVIDUAL_WINTER_STORAGE_APPLICATION_winterStorageApplication as WINTER_STORAGE_APPLICATION } from '../winterStorageApplicationView/__generated__/INDIVIDUAL_WINTER_STORAGE_APPLICATION';
import { CustomerProfileCardProps } from '../../common/customerProfileCard/CustomerProfileCard';
import { BerthApplicationLanguage, CustomerGroup, Language } from '../../@types/__generated__/globalTypes';

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

export const getApplicantDetails = (
  berthApplication: BERTH_APPLICATION | WINTER_STORAGE_APPLICATION
): CustomerProfileCardProps => {
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
  const choices =
    berthApplication.harborChoices?.map((choice) => {
      return {
        priority: choice?.priority ?? Number.MAX_VALUE,
        harborName: choice?.harborName ?? '',
        harbor: choice?.harbor ?? '',
      };
    }) ?? [];

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
    queue: null,
    choices,
    lease,
    boatType: boatTypes.find(({ id }) => id === berthApplication.boatType)?.name,
    summaryInformation: {
      applicationCode: berthApplication.applicationCode,
      acceptBoatingNewsletter: berthApplication.acceptBoatingNewsletter,
      acceptFitnessNews: berthApplication.acceptFitnessNews,
      acceptLibraryNews: berthApplication.acceptLibraryNews,
      acceptOtherCultureNews: berthApplication.acceptOtherCultureNews,
    },
    boatDraught,
    boatLength,
    boatModel,
    boatName,
    boatRegistrationNumber,
    boatWeight,
    boatWidth,
    createdAt,
    customerId: berthApplication.customer?.id,
    id,
    status,
  };
};
