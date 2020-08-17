/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BerthApplicationLanguage, CustomerGroup, InvoicingType, OrganizationType, Language, ApplicationStatus } from "./../../../@types/__generated__/globalTypes";

// ====================================================
// GraphQL query operation: INDIVIDUAL_WINTER_STORAGE_APPLICATION
// ====================================================

export interface INDIVIDUAL_WINTER_STORAGE_APPLICATION_winterStorageApplication_customer_organization {
  __typename: "OrganizationNode";
  address: string;
  businessId: string;
  city: string;
  name: string;
  organizationType: OrganizationType;
  postalCode: string;
}

export interface INDIVIDUAL_WINTER_STORAGE_APPLICATION_winterStorageApplication_customer_primaryAddress {
  __typename: "AddressNode";
  address: string;
  postalCode: string;
  city: string;
}

export interface INDIVIDUAL_WINTER_STORAGE_APPLICATION_winterStorageApplication_customer_primaryEmail {
  __typename: "EmailNode";
  email: string;
}

export interface INDIVIDUAL_WINTER_STORAGE_APPLICATION_winterStorageApplication_customer_primaryPhone {
  __typename: "PhoneNode";
  phone: string | null;
}

export interface INDIVIDUAL_WINTER_STORAGE_APPLICATION_winterStorageApplication_customer {
  __typename: "ProfileNode";
  customerGroup: CustomerGroup | null;
  comment: string | null;
  firstName: string;
  invoicingType: InvoicingType | null;
  lastName: string;
  id: string;
  organization: INDIVIDUAL_WINTER_STORAGE_APPLICATION_winterStorageApplication_customer_organization | null;
  primaryAddress: INDIVIDUAL_WINTER_STORAGE_APPLICATION_winterStorageApplication_customer_primaryAddress | null;
  primaryEmail: INDIVIDUAL_WINTER_STORAGE_APPLICATION_winterStorageApplication_customer_primaryEmail | null;
  primaryPhone: INDIVIDUAL_WINTER_STORAGE_APPLICATION_winterStorageApplication_customer_primaryPhone | null;
  language: Language | null;
}

export interface INDIVIDUAL_WINTER_STORAGE_APPLICATION_winterStorageApplication_winterStorageAreaChoices {
  __typename: "WinterStorageAreaChoiceType";
  winterStorageArea: string | null;
  priority: number;
  winterStorageAreaName: string;
}

export interface INDIVIDUAL_WINTER_STORAGE_APPLICATION_winterStorageApplication {
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
  customer: INDIVIDUAL_WINTER_STORAGE_APPLICATION_winterStorageApplication_customer | null;
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
  winterStorageAreaChoices: (INDIVIDUAL_WINTER_STORAGE_APPLICATION_winterStorageApplication_winterStorageAreaChoices | null)[] | null;
  applicationCode: string;
}

export interface INDIVIDUAL_WINTER_STORAGE_APPLICATION_boatTypes {
  __typename: "BoatTypeType";
  id: string;
  name: string | null;
}

export interface INDIVIDUAL_WINTER_STORAGE_APPLICATION {
  winterStorageApplication: INDIVIDUAL_WINTER_STORAGE_APPLICATION_winterStorageApplication | null;
  boatTypes: INDIVIDUAL_WINTER_STORAGE_APPLICATION_boatTypes[] | null;
}

export interface INDIVIDUAL_WINTER_STORAGE_APPLICATIONVariables {
  id: string;
}
