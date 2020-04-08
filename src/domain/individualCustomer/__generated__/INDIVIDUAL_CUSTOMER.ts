/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { InvoicingType, LeaseStatus, ApplicationStatus } from "./../../../@types/__generated__/globalTypes";

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

export interface INDIVIDUAL_CUSTOMER_profile_boats_edges_node_boatType {
  __typename: "BoatTypeType";
  id: string;
  name: string | null;
}

export interface INDIVIDUAL_CUSTOMER_profile_boats_edges_node {
  __typename: "BoatNode";
  id: string;
  boatType: INDIVIDUAL_CUSTOMER_profile_boats_edges_node_boatType;
  width: number;
  length: number;
  draught: number | null;
  weight: number | null;
  name: string;
  model: string;
  registrationNumber: string;
  propulsion: string;
  hullMaterial: string;
}

export interface INDIVIDUAL_CUSTOMER_profile_boats_edges {
  __typename: "BoatNodeEdge";
  node: INDIVIDUAL_CUSTOMER_profile_boats_edges_node | null;
}

export interface INDIVIDUAL_CUSTOMER_profile_boats {
  __typename: "BoatNodeConnection";
  edges: (INDIVIDUAL_CUSTOMER_profile_boats_edges | null)[];
}

export interface INDIVIDUAL_CUSTOMER_profile_berthLeases_edges_node_berth_pier_properties_harbor_properties {
  __typename: "HarborProperties";
  name: string | null;
}

export interface INDIVIDUAL_CUSTOMER_profile_berthLeases_edges_node_berth_pier_properties_harbor {
  __typename: "HarborNode";
  id: string;
  properties: INDIVIDUAL_CUSTOMER_profile_berthLeases_edges_node_berth_pier_properties_harbor_properties | null;
}

export interface INDIVIDUAL_CUSTOMER_profile_berthLeases_edges_node_berth_pier_properties {
  __typename: "PierProperties";
  identifier: string;
  harbor: INDIVIDUAL_CUSTOMER_profile_berthLeases_edges_node_berth_pier_properties_harbor;
}

export interface INDIVIDUAL_CUSTOMER_profile_berthLeases_edges_node_berth_pier {
  __typename: "PierNode";
  properties: INDIVIDUAL_CUSTOMER_profile_berthLeases_edges_node_berth_pier_properties | null;
}

export interface INDIVIDUAL_CUSTOMER_profile_berthLeases_edges_node_berth {
  __typename: "BerthNode";
  number: string;
  pier: INDIVIDUAL_CUSTOMER_profile_berthLeases_edges_node_berth_pier;
}

export interface INDIVIDUAL_CUSTOMER_profile_berthLeases_edges_node {
  __typename: "BerthLeaseNode";
  id: string;
  status: LeaseStatus;
  startDate: any;
  endDate: any;
  berth: INDIVIDUAL_CUSTOMER_profile_berthLeases_edges_node_berth;
}

export interface INDIVIDUAL_CUSTOMER_profile_berthLeases_edges {
  __typename: "BerthLeaseNodeEdge";
  node: INDIVIDUAL_CUSTOMER_profile_berthLeases_edges_node | null;
}

export interface INDIVIDUAL_CUSTOMER_profile_berthLeases {
  __typename: "BerthLeaseNodeConnection";
  edges: (INDIVIDUAL_CUSTOMER_profile_berthLeases_edges | null)[];
}

export interface INDIVIDUAL_CUSTOMER_profile_berthApplications_edges_node_berthSwitch {
  __typename: "BerthSwitchType";
  id: string;
}

export interface INDIVIDUAL_CUSTOMER_profile_berthApplications_edges_node_lease_berth_pier_properties_harbor_properties {
  __typename: "HarborProperties";
  name: string | null;
}

export interface INDIVIDUAL_CUSTOMER_profile_berthApplications_edges_node_lease_berth_pier_properties_harbor {
  __typename: "HarborNode";
  id: string;
  properties: INDIVIDUAL_CUSTOMER_profile_berthApplications_edges_node_lease_berth_pier_properties_harbor_properties | null;
}

export interface INDIVIDUAL_CUSTOMER_profile_berthApplications_edges_node_lease_berth_pier_properties {
  __typename: "PierProperties";
  identifier: string;
  harbor: INDIVIDUAL_CUSTOMER_profile_berthApplications_edges_node_lease_berth_pier_properties_harbor;
}

export interface INDIVIDUAL_CUSTOMER_profile_berthApplications_edges_node_lease_berth_pier {
  __typename: "PierNode";
  properties: INDIVIDUAL_CUSTOMER_profile_berthApplications_edges_node_lease_berth_pier_properties | null;
}

export interface INDIVIDUAL_CUSTOMER_profile_berthApplications_edges_node_lease_berth {
  __typename: "BerthNode";
  number: string;
  pier: INDIVIDUAL_CUSTOMER_profile_berthApplications_edges_node_lease_berth_pier;
}

export interface INDIVIDUAL_CUSTOMER_profile_berthApplications_edges_node_lease {
  __typename: "BerthLeaseNode";
  id: string;
  berth: INDIVIDUAL_CUSTOMER_profile_berthApplications_edges_node_lease_berth;
}

export interface INDIVIDUAL_CUSTOMER_profile_berthApplications_edges_node_harborChoices {
  __typename: "HarborChoiceType";
  harbor: string;
  priority: number;
  harborName: string;
}

export interface INDIVIDUAL_CUSTOMER_profile_berthApplications_edges_node {
  __typename: "BerthApplicationNode";
  id: string;
  berthSwitch: INDIVIDUAL_CUSTOMER_profile_berthApplications_edges_node_berthSwitch | null;
  createdAt: any;
  status: ApplicationStatus;
  lease: INDIVIDUAL_CUSTOMER_profile_berthApplications_edges_node_lease | null;
  boatType: string | null;
  boatRegistrationNumber: string;
  boatWidth: number;
  boatLength: number;
  boatDraught: number | null;
  boatWeight: number | null;
  boatName: string;
  boatModel: string;
  harborChoices: (INDIVIDUAL_CUSTOMER_profile_berthApplications_edges_node_harborChoices | null)[] | null;
  accessibilityRequired: boolean;
}

export interface INDIVIDUAL_CUSTOMER_profile_berthApplications_edges {
  __typename: "BerthApplicationNodeEdge";
  node: INDIVIDUAL_CUSTOMER_profile_berthApplications_edges_node | null;
}

export interface INDIVIDUAL_CUSTOMER_profile_berthApplications {
  __typename: "BerthApplicationNodeConnection";
  edges: (INDIVIDUAL_CUSTOMER_profile_berthApplications_edges | null)[];
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
  boats: INDIVIDUAL_CUSTOMER_profile_boats | null;
  berthLeases: INDIVIDUAL_CUSTOMER_profile_berthLeases | null;
  berthApplications: INDIVIDUAL_CUSTOMER_profile_berthApplications | null;
}

export interface INDIVIDUAL_CUSTOMER_boatTypes {
  __typename: "BoatTypeType";
  id: string;
  name: string | null;
}

export interface INDIVIDUAL_CUSTOMER {
  profile: INDIVIDUAL_CUSTOMER_profile | null;
  boatTypes: INDIVIDUAL_CUSTOMER_boatTypes[] | null;
}

export interface INDIVIDUAL_CUSTOMERVariables {
  id: string;
}
