import { ApplicationDetailsProps } from '../../common/applicationDetails/ApplicationDetails';
import {
  INDIVIDUAL_WINTER_STORAGE_APPLICATION_winterStorageApplication as WINTER_STORAGE_APPLICATION,
  INDIVIDUAL_WINTER_STORAGE_APPLICATION_boatTypes as BOAT_TYPES,
} from './__generated__/INDIVIDUAL_WINTER_STORAGE_APPLICATION';
import { getApplicantDetails } from '../applicationView/utils';

export const getWinterStorageApplicationDetailsData = (
  winterStorageApplication: WINTER_STORAGE_APPLICATION,
  boatTypes: BOAT_TYPES[]
): ApplicationDetailsProps & Required<Pick<ApplicationDetailsProps, 'applicant'>> => {
  const choices =
    winterStorageApplication.winterStorageAreaChoices?.map((choice) => {
      return {
        priority: choice?.priority ?? Number.MAX_VALUE,
        winterStorageAreaName: choice?.winterStorageAreaName ?? '',
        winterStorageArea: choice?.winterStorageArea ?? '',
      };
    }) ?? [];

  return {
    ...winterStorageApplication,
    customerId: winterStorageApplication.customer?.id,
    applicant: getApplicantDetails(winterStorageApplication),
    queue: null,
    choices,
    boatType: boatTypes.find(({ id }) => id === winterStorageApplication.boatType)?.name,
    summaryInformation: {
      applicationCode: winterStorageApplication.applicationCode,
      acceptBoatingNewsletter: winterStorageApplication.acceptBoatingNewsletter,
      acceptFitnessNews: winterStorageApplication.acceptFitnessNews,
      acceptLibraryNews: winterStorageApplication.acceptLibraryNews,
      acceptOtherCultureNews: winterStorageApplication.acceptOtherCultureNews,
    },
  };
};
