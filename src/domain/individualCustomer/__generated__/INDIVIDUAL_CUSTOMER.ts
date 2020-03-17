/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { InvoicingType } from "./../../../@types/__generated__/globalTypes";

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
  berthLeases: INDIVIDUAL_CUSTOMER_profile_berthLeases | null;
}

export interface INDIVIDUAL_CUSTOMER {
  profile: INDIVIDUAL_CUSTOMER_profile | null;
}

export interface INDIVIDUAL_CUSTOMERVariables {
  id: string;
}
