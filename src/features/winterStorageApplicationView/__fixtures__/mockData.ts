import {
  INDIVIDUAL_WINTER_STORAGE_APPLICATION,
  INDIVIDUAL_WINTER_STORAGE_APPLICATION_boatTypes as BOAT_TYPES,
  INDIVIDUAL_WINTER_STORAGE_APPLICATION_winterStorageApplication as WINTER_STORAGE_APPLICATION,
} from '../__generated__/INDIVIDUAL_WINTER_STORAGE_APPLICATION';
import { ApplicationStatus, BerthApplicationLanguage } from '../../../@types/__generated__/globalTypes';

export const mockData: INDIVIDUAL_WINTER_STORAGE_APPLICATION & {
  winterStorageApplication: WINTER_STORAGE_APPLICATION;
  boatTypes: BOAT_TYPES[];
} = {
  winterStorageApplication: {
    id: 'V2ludGVyU3RvcmFnZUFwcGxpY2F0aW9uTm9kZTox',
    firstName: 'test',
    lastName: 'test',
    address: 'test',
    municipality: 'helsinki',
    zipCode: '00100',
    phoneNumber: '555555',
    email: 'test@test.com',
    businessId: '',
    companyName: '',
    language: BerthApplicationLanguage.EN,
    customer: null,
    createdAt: '2019-05-06T10:54:21.746387+00:00',
    boatType: '3',
    boatRegistrationNumber: 'test',
    boatWidth: 1,
    boatLength: 1,
    boatName: 'test',
    boatModel: 'test',
    acceptBoatingNewsletter: true,
    acceptFitnessNews: true,
    acceptLibraryNews: true,
    acceptOtherCultureNews: true,
    status: ApplicationStatus.PENDING,
    winterStorageAreaChoices: [
      {
        winterStorageArea: null,
        priority: 1,
        winterStorageAreaName: 'Iso-Sarvasto',
        __typename: 'WinterStorageAreaChoiceType',
      },
      {
        winterStorageArea: null,
        priority: 2,
        winterStorageAreaName: 'Rajasaari',
        __typename: 'WinterStorageAreaChoiceType',
      },
    ],
    applicationCode: '1234',
    __typename: 'WinterStorageApplicationNode',
  },
  boatTypes: [
    {
      id: '1',
      name: 'Jollavene',
      __typename: 'BoatTypeType',
    },
    {
      id: '2',
      name: 'Soutuvene',
      __typename: 'BoatTypeType',
    },
    {
      id: '3',
      name: 'Perämoottorivene',
      __typename: 'BoatTypeType',
    },
    {
      id: '4',
      name: 'Sisäperämoottorivene',
      __typename: 'BoatTypeType',
    },
    {
      id: '5',
      name: 'Keskimoottorivene',
      __typename: 'BoatTypeType',
    },
    {
      id: '6',
      name: 'Purjevene / moottoripursi',
      __typename: 'BoatTypeType',
    },
    {
      id: '7',
      name: 'Troolari',
      __typename: 'BoatTypeType',
    },
    {
      id: '8',
      name: 'Suuri alus (yli 20t)',
      __typename: 'BoatTypeType',
    },
  ],
};
