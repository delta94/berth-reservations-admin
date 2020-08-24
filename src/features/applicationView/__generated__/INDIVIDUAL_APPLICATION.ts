/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BerthApplicationLanguage, InvoicingType, CustomerGroup, Language, ApplicationStatus, BerthMooringType, ProductServiceType, AdditionalProductType, PriceUnits, PeriodType } from "./../../../@types/__generated__/globalTypes";

// ====================================================
// GraphQL query operation: INDIVIDUAL_APPLICATION
// ====================================================

export interface INDIVIDUAL_APPLICATION_berthApplication_customer_organization {
  __typename: "OrganizationNode";
  address: string;
  businessId: string;
  city: string;
  name: string;
  postalCode: string;
}

export interface INDIVIDUAL_APPLICATION_berthApplication_customer_primaryAddress {
  __typename: "AddressNode";
  address: string;
  postalCode: string;
  city: string;
}

export interface INDIVIDUAL_APPLICATION_berthApplication_customer_primaryEmail {
  __typename: "EmailNode";
  email: string;
}

export interface INDIVIDUAL_APPLICATION_berthApplication_customer_primaryPhone {
  __typename: "PhoneNode";
  phone: string | null;
}

export interface INDIVIDUAL_APPLICATION_berthApplication_customer {
  __typename: "ProfileNode";
  comment: string | null;
  firstName: string;
  invoicingType: InvoicingType | null;
  lastName: string;
  id: string;
  customerGroup: CustomerGroup | null;
  organization: INDIVIDUAL_APPLICATION_berthApplication_customer_organization | null;
  primaryAddress: INDIVIDUAL_APPLICATION_berthApplication_customer_primaryAddress | null;
  primaryEmail: INDIVIDUAL_APPLICATION_berthApplication_customer_primaryEmail | null;
  primaryPhone: INDIVIDUAL_APPLICATION_berthApplication_customer_primaryPhone | null;
  language: Language | null;
}

export interface INDIVIDUAL_APPLICATION_berthApplication_berthSwitch_reason {
  __typename: "BerthSwitchReasonType";
  title: string | null;
}

export interface INDIVIDUAL_APPLICATION_berthApplication_berthSwitch {
  __typename: "BerthSwitchType";
  berthNumber: string;
  harbor: string;
  harborName: string;
  id: string;
  pier: string;
  reason: INDIVIDUAL_APPLICATION_berthApplication_berthSwitch_reason | null;
}

export interface INDIVIDUAL_APPLICATION_berthApplication_harborChoices {
  __typename: "HarborChoiceType";
  harbor: string;
  priority: number;
  harborName: string;
}

export interface INDIVIDUAL_APPLICATION_berthApplication_lease_berth_pier_properties_harbor_properties {
  __typename: "HarborProperties";
  name: string | null;
}

export interface INDIVIDUAL_APPLICATION_berthApplication_lease_berth_pier_properties_harbor {
  __typename: "HarborNode";
  id: string;
  properties: INDIVIDUAL_APPLICATION_berthApplication_lease_berth_pier_properties_harbor_properties | null;
}

export interface INDIVIDUAL_APPLICATION_berthApplication_lease_berth_pier_properties {
  __typename: "PierProperties";
  identifier: string;
  electricity: boolean;
  gate: boolean;
  lighting: boolean;
  mooring: boolean;
  wasteCollection: boolean;
  water: boolean;
  harbor: INDIVIDUAL_APPLICATION_berthApplication_lease_berth_pier_properties_harbor;
}

export interface INDIVIDUAL_APPLICATION_berthApplication_lease_berth_pier {
  __typename: "PierNode";
  properties: INDIVIDUAL_APPLICATION_berthApplication_lease_berth_pier_properties | null;
}

export interface INDIVIDUAL_APPLICATION_berthApplication_lease_berth {
  __typename: "BerthNode";
  depth: number | null;
  length: number;
  mooringType: BerthMooringType;
  width: number;
  comment: string;
  isAccessible: boolean | null;
  number: number;
  pier: INDIVIDUAL_APPLICATION_berthApplication_lease_berth_pier;
}

export interface INDIVIDUAL_APPLICATION_berthApplication_lease_order_orderLines_edges_node_product {
  __typename: "AdditionalProductNode";
  id: string;
  service: ProductServiceType;
  productType: AdditionalProductType;
}

export interface INDIVIDUAL_APPLICATION_berthApplication_lease_order_orderLines_edges_node {
  __typename: "OrderLineNode";
  id: string;
  price: any;
  product: INDIVIDUAL_APPLICATION_berthApplication_lease_order_orderLines_edges_node_product | null;
}

export interface INDIVIDUAL_APPLICATION_berthApplication_lease_order_orderLines_edges {
  __typename: "OrderLineNodeEdge";
  node: INDIVIDUAL_APPLICATION_berthApplication_lease_order_orderLines_edges_node | null;
}

export interface INDIVIDUAL_APPLICATION_berthApplication_lease_order_orderLines {
  __typename: "OrderLineNodeConnection";
  edges: (INDIVIDUAL_APPLICATION_berthApplication_lease_order_orderLines_edges | null)[];
}

export interface INDIVIDUAL_APPLICATION_berthApplication_lease_order {
  __typename: "OrderNode";
  id: string;
  price: any;
  totalPrice: any;
  orderLines: INDIVIDUAL_APPLICATION_berthApplication_lease_order_orderLines;
}

export interface INDIVIDUAL_APPLICATION_berthApplication_lease {
  __typename: "BerthLeaseNode";
  id: string;
  berth: INDIVIDUAL_APPLICATION_berthApplication_lease_berth;
  order: INDIVIDUAL_APPLICATION_berthApplication_lease_order | null;
}

export interface INDIVIDUAL_APPLICATION_berthApplication {
  __typename: "BerthApplicationNode";
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
  customer: INDIVIDUAL_APPLICATION_berthApplication_customer | null;
  berthSwitch: INDIVIDUAL_APPLICATION_berthApplication_berthSwitch | null;
  createdAt: any;
  boatType: string | null;
  boatRegistrationNumber: string;
  boatWidth: number;
  boatLength: number;
  boatDraught: number | null;
  boatWeight: number | null;
  boatName: string;
  boatModel: string;
  accessibilityRequired: boolean;
  status: ApplicationStatus;
  harborChoices: (INDIVIDUAL_APPLICATION_berthApplication_harborChoices | null)[] | null;
  acceptBoatingNewsletter: boolean;
  acceptFitnessNews: boolean;
  acceptLibraryNews: boolean;
  acceptOtherCultureNews: boolean;
  applicationCode: string;
  lease: INDIVIDUAL_APPLICATION_berthApplication_lease | null;
}

export interface INDIVIDUAL_APPLICATION_boatTypes {
  __typename: "BoatTypeType";
  id: string;
  name: string | null;
}

export interface INDIVIDUAL_APPLICATION_additionalProducts_edges_node {
  __typename: "AdditionalProductNode";
  id: string;
  service: ProductServiceType;
  priceValue: any;
  priceUnit: PriceUnits;
  period: PeriodType;
  productType: AdditionalProductType;
}

export interface INDIVIDUAL_APPLICATION_additionalProducts_edges {
  __typename: "AdditionalProductNodeEdge";
  node: INDIVIDUAL_APPLICATION_additionalProducts_edges_node | null;
}

export interface INDIVIDUAL_APPLICATION_additionalProducts {
  __typename: "AdditionalProductNodeConnection";
  edges: (INDIVIDUAL_APPLICATION_additionalProducts_edges | null)[];
}

export interface INDIVIDUAL_APPLICATION {
  berthApplication: INDIVIDUAL_APPLICATION_berthApplication | null;
  boatTypes: INDIVIDUAL_APPLICATION_boatTypes[] | null;
  __typename: "Query";
  additionalProducts: INDIVIDUAL_APPLICATION_additionalProducts | null;
}

export interface INDIVIDUAL_APPLICATIONVariables {
  id: string;
}
