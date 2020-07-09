/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { InvoicingType, OrganizationType, Language, BoatCertificateType, LeaseStatus, OrderStatus, ProductServiceType, ApplicationStatus } from "./../../../@types/__generated__/globalTypes";

// ====================================================
// GraphQL query operation: INDIVIDUAL_CUSTOMER
// ====================================================

export interface INDIVIDUAL_CUSTOMER_profile_organization {
  __typename: "OrganizationNode";
  address: string;
  businessId: string;
  city: string;
  name: string;
  organizationType: OrganizationType;
  postalCode: string;
}

export interface INDIVIDUAL_CUSTOMER_profile_primaryAddress {
  __typename: "AddressNode";
  address: string;
  postalCode: string;
  city: string;
}

export interface INDIVIDUAL_CUSTOMER_profile_primaryEmail {
  __typename: "EmailNode";
  email: string;
}

export interface INDIVIDUAL_CUSTOMER_profile_primaryPhone {
  __typename: "PhoneNode";
  phone: string | null;
}

export interface INDIVIDUAL_CUSTOMER_profile_boats_edges_node_boatType {
  __typename: "BoatTypeType";
  id: string;
  name: string | null;
}

export interface INDIVIDUAL_CUSTOMER_profile_boats_edges_node_certificates {
  __typename: "BoatCertificateNode";
  file: string | null;
  certificateType: BoatCertificateType;
  validUntil: any | null;
  checkedAt: any;
  checkedBy: string | null;
}

export interface INDIVIDUAL_CUSTOMER_profile_boats_edges_node {
  __typename: "BoatNode";
  id: string;
  boatType: INDIVIDUAL_CUSTOMER_profile_boats_edges_node_boatType;
  width: any;
  length: any;
  draught: any | null;
  weight: number | null;
  name: string;
  model: string;
  registrationNumber: string;
  propulsion: string;
  hullMaterial: string;
  intendedUse: string;
  certificates: (INDIVIDUAL_CUSTOMER_profile_boats_edges_node_certificates | null)[];
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
  number: number;
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

export interface INDIVIDUAL_CUSTOMER_profile_orders_edges_node_orderLines_edges_node_product {
  __typename: "AdditionalProductNode";
  service: ProductServiceType;
}

export interface INDIVIDUAL_CUSTOMER_profile_orders_edges_node_orderLines_edges_node {
  __typename: "OrderLineNode";
  product: INDIVIDUAL_CUSTOMER_profile_orders_edges_node_orderLines_edges_node_product | null;
  price: any;
  taxPercentage: any;
}

export interface INDIVIDUAL_CUSTOMER_profile_orders_edges_node_orderLines_edges {
  __typename: "OrderLineNodeEdge";
  node: INDIVIDUAL_CUSTOMER_profile_orders_edges_node_orderLines_edges_node | null;
}

export interface INDIVIDUAL_CUSTOMER_profile_orders_edges_node_orderLines {
  __typename: "OrderLineNodeConnection";
  edges: (INDIVIDUAL_CUSTOMER_profile_orders_edges_node_orderLines_edges | null)[];
}

export interface INDIVIDUAL_CUSTOMER_profile_orders_edges_node_lease_berth_pier_properties_harbor_properties {
  __typename: "HarborProperties";
  name: string | null;
}

export interface INDIVIDUAL_CUSTOMER_profile_orders_edges_node_lease_berth_pier_properties_harbor {
  __typename: "HarborNode";
  properties: INDIVIDUAL_CUSTOMER_profile_orders_edges_node_lease_berth_pier_properties_harbor_properties | null;
}

export interface INDIVIDUAL_CUSTOMER_profile_orders_edges_node_lease_berth_pier_properties {
  __typename: "PierProperties";
  identifier: string;
  harbor: INDIVIDUAL_CUSTOMER_profile_orders_edges_node_lease_berth_pier_properties_harbor;
}

export interface INDIVIDUAL_CUSTOMER_profile_orders_edges_node_lease_berth_pier {
  __typename: "PierNode";
  properties: INDIVIDUAL_CUSTOMER_profile_orders_edges_node_lease_berth_pier_properties | null;
}

export interface INDIVIDUAL_CUSTOMER_profile_orders_edges_node_lease_berth {
  __typename: "BerthNode";
  number: number;
  pier: INDIVIDUAL_CUSTOMER_profile_orders_edges_node_lease_berth_pier;
}

export interface INDIVIDUAL_CUSTOMER_profile_orders_edges_node_lease {
  __typename: "BerthLeaseNode";
  startDate: any;
  endDate: any;
  berth: INDIVIDUAL_CUSTOMER_profile_orders_edges_node_lease_berth;
}

export interface INDIVIDUAL_CUSTOMER_profile_orders_edges_node {
  __typename: "OrderNode";
  dueDate: any;
  totalPrice: any;
  totalTaxPercentage: any;
  price: any;
  taxPercentage: any;
  status: OrderStatus;
  orderLines: INDIVIDUAL_CUSTOMER_profile_orders_edges_node_orderLines;
  lease: INDIVIDUAL_CUSTOMER_profile_orders_edges_node_lease | null;
}

export interface INDIVIDUAL_CUSTOMER_profile_orders_edges {
  __typename: "OrderNodeEdge";
  node: INDIVIDUAL_CUSTOMER_profile_orders_edges_node | null;
}

export interface INDIVIDUAL_CUSTOMER_profile_orders {
  __typename: "OrderNodeConnection";
  edges: (INDIVIDUAL_CUSTOMER_profile_orders_edges | null)[];
}

export interface INDIVIDUAL_CUSTOMER_profile_berthApplications_edges_node_berthSwitch_reason {
  __typename: "BerthSwitchReasonType";
  title: string | null;
}

export interface INDIVIDUAL_CUSTOMER_profile_berthApplications_edges_node_berthSwitch {
  __typename: "BerthSwitchType";
  berthNumber: string;
  harbor: string;
  harborName: string;
  id: string;
  pier: string;
  reason: INDIVIDUAL_CUSTOMER_profile_berthApplications_edges_node_berthSwitch_reason | null;
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
  number: number;
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
  comment: string | null;
  firstName: string;
  invoicingType: InvoicingType | null;
  lastName: string;
  id: string;
  organization: INDIVIDUAL_CUSTOMER_profile_organization | null;
  primaryAddress: INDIVIDUAL_CUSTOMER_profile_primaryAddress | null;
  primaryEmail: INDIVIDUAL_CUSTOMER_profile_primaryEmail | null;
  primaryPhone: INDIVIDUAL_CUSTOMER_profile_primaryPhone | null;
  language: Language | null;
  boats: INDIVIDUAL_CUSTOMER_profile_boats | null;
  berthLeases: INDIVIDUAL_CUSTOMER_profile_berthLeases | null;
  orders: INDIVIDUAL_CUSTOMER_profile_orders | null;
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
