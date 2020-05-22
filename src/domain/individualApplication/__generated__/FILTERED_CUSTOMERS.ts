/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrganizationType } from "./../../../@types/__generated__/globalTypes";

// ====================================================
// GraphQL query operation: FILTERED_CUSTOMERS
// ====================================================

export interface FILTERED_CUSTOMERS_profiles_edges_node_primaryAddress {
  __typename: "AddressNode";
  address: string;
  postalCode: string;
  city: string;
}

export interface FILTERED_CUSTOMERS_profiles_edges_node_organization {
  __typename: "OrganizationNode";
  businessId: string;
  organizationType: OrganizationType;
}

export interface FILTERED_CUSTOMERS_profiles_edges_node_berthLeases_edges_node_berth_pier_properties_harbor_properties {
  __typename: "HarborProperties";
  name: string | null;
}

export interface FILTERED_CUSTOMERS_profiles_edges_node_berthLeases_edges_node_berth_pier_properties_harbor {
  __typename: "HarborNode";
  id: string;
  properties: FILTERED_CUSTOMERS_profiles_edges_node_berthLeases_edges_node_berth_pier_properties_harbor_properties | null;
}

export interface FILTERED_CUSTOMERS_profiles_edges_node_berthLeases_edges_node_berth_pier_properties {
  __typename: "PierProperties";
  identifier: string;
  harbor: FILTERED_CUSTOMERS_profiles_edges_node_berthLeases_edges_node_berth_pier_properties_harbor;
}

export interface FILTERED_CUSTOMERS_profiles_edges_node_berthLeases_edges_node_berth_pier {
  __typename: "PierNode";
  properties: FILTERED_CUSTOMERS_profiles_edges_node_berthLeases_edges_node_berth_pier_properties | null;
}

export interface FILTERED_CUSTOMERS_profiles_edges_node_berthLeases_edges_node_berth {
  __typename: "BerthNode";
  number: number;
  pier: FILTERED_CUSTOMERS_profiles_edges_node_berthLeases_edges_node_berth_pier;
}

export interface FILTERED_CUSTOMERS_profiles_edges_node_berthLeases_edges_node {
  __typename: "BerthLeaseNode";
  berth: FILTERED_CUSTOMERS_profiles_edges_node_berthLeases_edges_node_berth;
}

export interface FILTERED_CUSTOMERS_profiles_edges_node_berthLeases_edges {
  __typename: "BerthLeaseNodeEdge";
  node: FILTERED_CUSTOMERS_profiles_edges_node_berthLeases_edges_node | null;
}

export interface FILTERED_CUSTOMERS_profiles_edges_node_berthLeases {
  __typename: "BerthLeaseNodeConnection";
  edges: (FILTERED_CUSTOMERS_profiles_edges_node_berthLeases_edges | null)[];
}

export interface FILTERED_CUSTOMERS_profiles_edges_node_berthApplications_edges_node_berthSwitch {
  __typename: "BerthSwitchType";
  harborName: string;
}

export interface FILTERED_CUSTOMERS_profiles_edges_node_berthApplications_edges_node {
  __typename: "BerthApplicationNode";
  berthSwitch: FILTERED_CUSTOMERS_profiles_edges_node_berthApplications_edges_node_berthSwitch | null;
}

export interface FILTERED_CUSTOMERS_profiles_edges_node_berthApplications_edges {
  __typename: "BerthApplicationNodeEdge";
  node: FILTERED_CUSTOMERS_profiles_edges_node_berthApplications_edges_node | null;
}

export interface FILTERED_CUSTOMERS_profiles_edges_node_berthApplications {
  __typename: "BerthApplicationNodeConnection";
  edges: (FILTERED_CUSTOMERS_profiles_edges_node_berthApplications_edges | null)[];
}

export interface FILTERED_CUSTOMERS_profiles_edges_node {
  __typename: "ProfileNode";
  id: string;
  firstName: string;
  lastName: string;
  primaryAddress: FILTERED_CUSTOMERS_profiles_edges_node_primaryAddress | null;
  organization: FILTERED_CUSTOMERS_profiles_edges_node_organization | null;
  berthLeases: FILTERED_CUSTOMERS_profiles_edges_node_berthLeases | null;
  berthApplications: FILTERED_CUSTOMERS_profiles_edges_node_berthApplications | null;
}

export interface FILTERED_CUSTOMERS_profiles_edges {
  __typename: "ProfileNodeEdge";
  node: FILTERED_CUSTOMERS_profiles_edges_node | null;
}

export interface FILTERED_CUSTOMERS_profiles {
  __typename: "ProfileNodeConnection";
  count: number | null;
  edges: (FILTERED_CUSTOMERS_profiles_edges | null)[];
}

export interface FILTERED_CUSTOMERS {
  profiles: FILTERED_CUSTOMERS_profiles | null;
}

export interface FILTERED_CUSTOMERSVariables {
  first: number;
  after?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  address?: string | null;
  orderBy?: string | null;
}
