/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { InvoicingType } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: INDIVIDUAL_CUSTOMER
// ====================================================

export interface INDIVIDUAL_CUSTOMER_profile_primaryEmail {
  __typename: "EmailNode";
  email: string;
}

export interface INDIVIDUAL_CUSTOMER_profile_primaryPhone {
  __typename: "PhoneNode";
  phone: string | null;
}

export interface INDIVIDUAL_CUSTOMER_profile_primaryAddress {
  __typename: "AddressNode";
  address: string;
  postalCode: string;
  city: string;
}

export interface INDIVIDUAL_CUSTOMER_profile {
  __typename: "ProfileNode";
  id: string;
  firstName: string;
  lastName: string;
  primaryEmail: INDIVIDUAL_CUSTOMER_profile_primaryEmail | null;
  primaryPhone: INDIVIDUAL_CUSTOMER_profile_primaryPhone | null;
  primaryAddress: INDIVIDUAL_CUSTOMER_profile_primaryAddress | null;
  invoicingType: InvoicingType | null;
  comment: string | null;
}

export interface INDIVIDUAL_CUSTOMER {
  profile: INDIVIDUAL_CUSTOMER_profile | null;
}

export interface INDIVIDUAL_CUSTOMERVariables {
  id: string;
}
