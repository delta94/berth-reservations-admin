/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrganizationType, ServiceType, ContactMethod } from "./../../../@types/__generated__/globalTypes";

// ====================================================
// GraphQL query operation: CUSTOMERS
// ====================================================

export interface CUSTOMERS_profiles_edges_node_organization {
  __typename: "OrganizationNode";
  businessId: string;
  organizationType: OrganizationType;
}

export interface CUSTOMERS_profiles_edges_node_primaryAddress {
  __typename: "AddressNode";
  address: string;
  city: string;
  postalCode: string;
}

export interface CUSTOMERS_profiles_edges_node_primaryPhone {
  __typename: "PhoneNode";
  phone: string | null;
}

export interface CUSTOMERS_profiles_edges_node_primaryEmail {
  __typename: "EmailNode";
  email: string;
}

export interface CUSTOMERS_profiles_edges_node_serviceConnections_edges_node_service {
  __typename: "ServiceNode";
  id: string;
  type: ServiceType | null;
}

export interface CUSTOMERS_profiles_edges_node_serviceConnections_edges_node {
  __typename: "ServiceConnectionType";
  id: string;
  service: CUSTOMERS_profiles_edges_node_serviceConnections_edges_node_service;
}

export interface CUSTOMERS_profiles_edges_node_serviceConnections_edges {
  __typename: "ServiceConnectionTypeEdge";
  node: CUSTOMERS_profiles_edges_node_serviceConnections_edges_node | null;
}

export interface CUSTOMERS_profiles_edges_node_serviceConnections {
  __typename: "ServiceConnectionTypeConnection";
  edges: (CUSTOMERS_profiles_edges_node_serviceConnections_edges | null)[];
}

export interface CUSTOMERS_profiles_edges_node {
  __typename: "ProfileNode";
  id: string;
  firstName: string;
  lastName: string;
  nickname: string;
  organization: CUSTOMERS_profiles_edges_node_organization | null;
  primaryAddress: CUSTOMERS_profiles_edges_node_primaryAddress | null;
  primaryPhone: CUSTOMERS_profiles_edges_node_primaryPhone | null;
  primaryEmail: CUSTOMERS_profiles_edges_node_primaryEmail | null;
  serviceConnections: CUSTOMERS_profiles_edges_node_serviceConnections | null;
  contactMethod: ContactMethod | null;
  image: string | null;
}

export interface CUSTOMERS_profiles_edges {
  __typename: "ProfileNodeEdge";
  node: CUSTOMERS_profiles_edges_node | null;
}

export interface CUSTOMERS_profiles {
  __typename: "ProfileNodeConnection";
  edges: (CUSTOMERS_profiles_edges | null)[];
}

export interface CUSTOMERS {
  profiles: CUSTOMERS_profiles | null;
}
