import {
  UNMARKED_WINTER_STORAGE_NOTICE_winterStorageApplication as WINTER_STORAGE_APPLICATION,
  UNMARKED_WINTER_STORAGE_NOTICE_boatTypes as BOAT_TYPES,
} from './__generated__/UNMARKED_WINTER_STORAGE_NOTICE';
import { getApplicantDetails } from '../applicationView/utils';
import { UNMARKED_WINTER_STORAGE_APPLICATIONS_winterStorageApplications_edges_node_winterStorageAreaChoices as CHOICE } from '../unmarkedWsNoticeList/__generated__/UNMARKED_WINTER_STORAGE_APPLICATIONS';
import { UnmarkedWsNoticeDetailsProps } from '../../common/unmarkedWsNoticeDetails/UnmarkedWsNoticeDetails';

interface UnmarkedWinterStorageChoice {
  winterStorageAreaName: string;
  winterStorageArea: string;
}

export const getWinterStorageApplicationDetailsData = (
  winterStorageApplication: WINTER_STORAGE_APPLICATION,
  boatTypes: BOAT_TYPES[]
): UnmarkedWsNoticeDetailsProps & Required<Pick<UnmarkedWsNoticeDetailsProps, 'applicant'>> => {
  const choices = winterStorageApplication.winterStorageAreaChoices;
  const choice: UnmarkedWinterStorageChoice =
    choices !== null && choices.length > 0 && choices[0] !== null
      ? {
          winterStorageArea: (choices[0] as CHOICE).winterStorageArea || '',
          winterStorageAreaName: (choices[0] as CHOICE).winterStorageArea || '',
        }
      : {
          winterStorageArea: 'Virhe',
          winterStorageAreaName: 'Virhe',
        };

  return {
    ...winterStorageApplication,
    customerId: winterStorageApplication.customer?.id,
    applicant: getApplicantDetails(winterStorageApplication),
    queue: null,
    choice,
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
