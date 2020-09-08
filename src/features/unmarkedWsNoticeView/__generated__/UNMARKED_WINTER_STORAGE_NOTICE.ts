/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BerthApplicationLanguage, CustomerGroup, InvoicingType, OrganizationType, Language, ApplicationStatus } from "./../../../@types/__generated__/globalTypes";

// ====================================================
// GraphQL query operation: UNMARKED_WINTER_STORAGE_NOTICE
// ====================================================

export interface UNMARKED_WINTER_STORAGE_NOTICE_winterStorageApplication_customer_organization {
  __typename: "OrganizationNode";
  address: string;
  businessId: string;
  city: string;
  name: string;
  organizationType: OrganizationType;
  postalCode: string;
}

export interface UNMARKED_WINTER_STORAGE_NOTICE_winterStorageApplication_customer_primaryAddress {
  __typename: "AddressNode";
  address: string;
  postalCode: string;
  city: string;
}

export interface UNMARKED_WINTER_STORAGE_NOTICE_winterStorageApplication_customer_primaryEmail {
  __typename: "EmailNode";
  email: string;
}

export interface UNMARKED_WINTER_STORAGE_NOTICE_winterStorageApplication_customer_primaryPhone {
  __typename: "PhoneNode";
  phone: string | null;
}

export interface UNMARKED_WINTER_STORAGE_NOTICE_winterStorageApplication_customer {
  __typename: "ProfileNode";
  customerGroup: CustomerGroup | null;
  comment: string | null;
  firstName: string;
  invoicingType: InvoicingType | null;
  lastName: string;
  id: string;
  organization: UNMARKED_WINTER_STORAGE_NOTICE_winterStorageApplication_customer_organization | null;
  primaryAddress: UNMARKED_WINTER_STORAGE_NOTICE_winterStorageApplication_customer_primaryAddress | null;
  primaryEmail: UNMARKED_WINTER_STORAGE_NOTICE_winterStorageApplication_customer_primaryEmail | null;
  primaryPhone: UNMARKED_WINTER_STORAGE_NOTICE_winterStorageApplication_customer_primaryPhone | null;
  language: Language | null;
}

export interface UNMARKED_WINTER_STORAGE_NOTICE_winterStorageApplication_winterStorageAreaChoices {
  __typename: "WinterStorageAreaChoiceType";
  winterStorageArea: string | null;
  priority: number;
  winterStorageAreaName: string;
}

export interface UNMARKED_WINTER_STORAGE_NOTICE_winterStorageApplication {
  __typename: "WinterStorageApplicationNode";
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  municipality: string;
  zipCode: string;
  phoneNumber: string;
  email: string;
  businessId: string;
  companyName: string;
  language: BerthApplicationLanguage;
  customer: UNMARKED_WINTER_STORAGE_NOTICE_winterStorageApplication_customer | null;
  createdAt: any;
  boatType: string | null;
  boatRegistrationNumber: string;
  boatWidth: number;
  boatLength: number;
  boatName: string;
  boatModel: string;
  acceptBoatingNewsletter: boolean;
  acceptFitnessNews: boolean;
  acceptLibraryNews: boolean;
  acceptOtherCultureNews: boolean;
  status: ApplicationStatus;
  winterStorageAreaChoices: (UNMARKED_WINTER_STORAGE_NOTICE_winterStorageApplication_winterStorageAreaChoices | null)[] | null;
  applicationCode: string;
}

export interface UNMARKED_WINTER_STORAGE_NOTICE_boatTypes {
  __typename: "BoatTypeType";
  id: string;
  name: string | null;
}

export interface UNMARKED_WINTER_STORAGE_NOTICE {
  winterStorageApplication: UNMARKED_WINTER_STORAGE_NOTICE_winterStorageApplication | null;
  boatTypes: UNMARKED_WINTER_STORAGE_NOTICE_boatTypes[] | null;
}

export interface UNMARKED_WINTER_STORAGE_NOTICEVariables {
  id: string;
}
