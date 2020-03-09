/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FILTERED_PROFILES
// ====================================================

export interface FILTERED_PROFILES_profiles_edges_node_primaryAddress {
  __typename: "AddressNode";
  address: string;
  postalCode: string;
  city: string;
}

export interface FILTERED_PROFILES_profiles_edges_node_berthApplications_edges_node {
  __typename: "BerthApplicationNode";
  address: string;
}

export interface FILTERED_PROFILES_profiles_edges_node_berthApplications_edges {
  __typename: "BerthApplicationNodeEdge";
  node: FILTERED_PROFILES_profiles_edges_node_berthApplications_edges_node | null;
}

export interface FILTERED_PROFILES_profiles_edges_node_berthApplications {
  __typename: "BerthApplicationNodeConnection";
  edges: (FILTERED_PROFILES_profiles_edges_node_berthApplications_edges | null)[];
}

export interface FILTERED_PROFILES_profiles_edges_node {
  __typename: "ProfileNode";
  id: string;
  firstName: string;
  lastName: string;
  primaryAddress: FILTERED_PROFILES_profiles_edges_node_primaryAddress | null;
  berthApplications: FILTERED_PROFILES_profiles_edges_node_berthApplications | null;
}

export interface FILTERED_PROFILES_profiles_edges {
  __typename: "ProfileNodeEdge";
  node: FILTERED_PROFILES_profiles_edges_node | null;
}

export interface FILTERED_PROFILES_profiles {
  __typename: "ProfileNodeConnection";
  edges: (FILTERED_PROFILES_profiles_edges | null)[];
}

export interface FILTERED_PROFILES {
  profiles: FILTERED_PROFILES_profiles | null;
}

export interface FILTERED_PROFILESVariables {
  firstName?: string | null;
}
