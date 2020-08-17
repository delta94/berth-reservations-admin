import {
  INDIVIDUAL_APPLICATION,
  INDIVIDUAL_APPLICATION_additionalProducts as ADDITIONAL_PRODUCTS,
  INDIVIDUAL_APPLICATION_berthApplication as BERTH_APPLICATION,
  INDIVIDUAL_APPLICATION_berthApplication_berthSwitch as BERTH_SWITCH,
  INDIVIDUAL_APPLICATION_berthApplication_customer as CUSTOMER,
  INDIVIDUAL_APPLICATION_berthApplication_lease as LEASE,
  INDIVIDUAL_APPLICATION_boatTypes as BOAT_TYPES,
} from '../__generated__/INDIVIDUAL_APPLICATION';
import {
  AdditionalProductType,
  ApplicationStatus,
  BerthApplicationLanguage,
  BerthMooringType,
  CustomerGroup,
  InvoicingType,
  Language,
  PeriodType,
  PriceUnits,
  ProductServiceType,
} from '../../../@types/__generated__/globalTypes';

export const mockCustomer: CUSTOMER = {
  __typename: 'ProfileNode',
  comment: 'Comment',
  firstName: 'Testi',
  id: 'MOCK-CUSTOMER',
  invoicingType: InvoicingType.DIGITAL_INVOICE,
  language: Language.FINNISH,
  lastName: 'Testinen',
  organization: null,
  primaryAddress: { __typename: 'AddressNode', address: 'Testikatu 1', city: 'Helsinki', postalCode: '00100' },
  primaryEmail: { __typename: 'EmailNode', email: 'test@example.com' },
  primaryPhone: { __typename: 'PhoneNode', phone: '+358 00 000 0000' },
  customerGroup: CustomerGroup.PRIVATE,
};

export const mockBerthSwitch: BERTH_SWITCH = {
  __typename: 'BerthSwitchType',
  berthNumber: '1',
  harbor: 'MOCK-HARBOR',
  harborName: 'Test Harbor',
  id: 'MOCK-BERTH-SWITCH',
  pier: 'A',
  reason: { __typename: 'BerthSwitchReasonType', title: 'Reason' },
};

export const mockLease: LEASE = {
  __typename: 'BerthLeaseNode',
  berth: {
    __typename: 'BerthNode',
    comment: '',
    depth: null,
    isAccessible: null,
    length: 5,
    mooringType: BerthMooringType.DINGHY_PLACE,
    number: 1,
    pier: {
      __typename: 'PierNode',
      properties: {
        __typename: 'PierProperties',
        electricity: false,
        gate: false,
        harbor: {
          __typename: 'HarborNode',
          id: 'MOCK-HARBOR',
          properties: { __typename: 'HarborProperties', name: 'Test Harbor' },
        },
        identifier: 'A',
        lighting: false,
        mooring: false,
        wasteCollection: false,
        water: false,
      },
    },
    width: 0,
  },
  id: 'MOCK-LEASE',
  order: null,
};

const additionalProducts: ADDITIONAL_PRODUCTS = {
  __typename: 'AdditionalProductNodeConnection',
  edges: [
    {
      __typename: 'AdditionalProductNodeEdge',
      node: {
        __typename: 'AdditionalProductNode',
        id: 'MOCK-ADDITIONAL-PRODUCT-NODE',
        period: PeriodType.MONTH,
        priceUnit: PriceUnits.AMOUNT,
        priceValue: '25.00',
        productType: AdditionalProductType.OPTIONAL_SERVICE,
        service: ProductServiceType.DINGHY_PLACE,
      },
    },
  ],
};

const berthApplication: BERTH_APPLICATION = {
  __typename: 'BerthApplicationNode',
  accessibilityRequired: false,
  address: 'Testikatu 1',
  berthSwitch: null,
  boatDraught: 1,
  boatLength: 1,
  boatModel: 'Marine',
  boatName: 'Cama la Yano',
  boatRegistrationNumber: '1234',
  boatType: '7',
  boatWeight: 120,
  boatWidth: 1,
  businessId: '',
  companyName: '',
  createdAt: '2020-07-10T08:04:36.062819+00:00',
  customer: null,
  email: 'test@example.com',
  firstName: 'Testi',
  harborChoices: [
    { harbor: 'MOCK-HARBOR-B', priority: 1, harborName: 'Saukonpaaden venesatama', __typename: 'HarborChoiceType' },
  ],
  id: 'MOCK-APPLICATION',
  language: BerthApplicationLanguage.FI,
  lastName: 'Testinen',
  lease: null,
  municipality: 'Helsinki',
  phoneNumber: '+358 00 000 0000',
  status: ApplicationStatus.PENDING,
  zipCode: '00100',
  acceptBoatingNewsletter: true,
  acceptFitnessNews: false,
  acceptLibraryNews: false,
  acceptOtherCultureNews: true,
  applicationCode: '1234',
};

const boatTypes: BOAT_TYPES[] = [
  { id: '1', name: 'Jollavene', __typename: 'BoatTypeType' },
  { id: '2', name: 'Soutuvene', __typename: 'BoatTypeType' },
  { id: '3', name: 'Perämoottorivene', __typename: 'BoatTypeType' },
  { id: '4', name: 'Sisäperämoottorivene', __typename: 'BoatTypeType' },
  { id: '5', name: 'Keskimoottorivene', __typename: 'BoatTypeType' },
  { id: '6', name: 'Purjevene / moottoripursi', __typename: 'BoatTypeType' },
  { id: '7', name: 'Troolari', __typename: 'BoatTypeType' },
  { id: '8', name: 'Suuri alus (yli 20t)', __typename: 'BoatTypeType' },
];

export const mockApplication: INDIVIDUAL_APPLICATION = {
  __typename: 'Query',
  additionalProducts: additionalProducts,
  berthApplication: berthApplication,
  boatTypes: boatTypes,
};
