/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ApplicationStatus, BerthMooringType } from "./../../../@types/__generated__/globalTypes";

// ====================================================
// GraphQL query operation: OFFER_PAGE
// ====================================================

export interface OFFER_PAGE_berthApplication_berthSwitch {
  __typename: "BerthSwitchType";
  id: string;
}

export interface OFFER_PAGE_berthApplication_customer {
  __typename: "BerthProfileNode";
  id: string;
}

export interface OFFER_PAGE_berthApplication {
  __typename: "BerthApplicationNode";
  id: string;
  createdAt: any;
  status: ApplicationStatus;
  berthSwitch: OFFER_PAGE_berthApplication_berthSwitch | null;
  customer: OFFER_PAGE_berthApplication_customer | null;
}

export interface OFFER_PAGE_harborByServicemapId_properties_piers_edges_node_properties_berths_edges_node_pier_properties {
  __typename: "PierProperties";
  electricity: boolean;
}

export interface OFFER_PAGE_harborByServicemapId_properties_piers_edges_node_properties_berths_edges_node_pier {
  __typename: "PierNode";
  properties: OFFER_PAGE_harborByServicemapId_properties_piers_edges_node_properties_berths_edges_node_pier_properties | null;
}

export interface OFFER_PAGE_harborByServicemapId_properties_piers_edges_node_properties_berths_edges_node_leases_edges_node {
  __typename: "BerthLeaseNode";
  startDate: any;
  endDate: any;
}

export interface OFFER_PAGE_harborByServicemapId_properties_piers_edges_node_properties_berths_edges_node_leases_edges {
  __typename: "BerthLeaseNodeEdge";
  node: OFFER_PAGE_harborByServicemapId_properties_piers_edges_node_properties_berths_edges_node_leases_edges_node | null;
}

export interface OFFER_PAGE_harborByServicemapId_properties_piers_edges_node_properties_berths_edges_node_leases {
  __typename: "BerthLeaseNodeConnection";
  edges: (OFFER_PAGE_harborByServicemapId_properties_piers_edges_node_properties_berths_edges_node_leases_edges | null)[];
}

export interface OFFER_PAGE_harborByServicemapId_properties_piers_edges_node_properties_berths_edges_node_berthType {
  __typename: "BerthTypeNode";
  width: number;
  length: number;
  mooringType: BerthMooringType;
}

export interface OFFER_PAGE_harborByServicemapId_properties_piers_edges_node_properties_berths_edges_node {
  __typename: "BerthNode";
  id: string;
  number: string;
  comment: string;
  pier: OFFER_PAGE_harborByServicemapId_properties_piers_edges_node_properties_berths_edges_node_pier;
  leases: OFFER_PAGE_harborByServicemapId_properties_piers_edges_node_properties_berths_edges_node_leases | null;
  berthType: OFFER_PAGE_harborByServicemapId_properties_piers_edges_node_properties_berths_edges_node_berthType;
}

export interface OFFER_PAGE_harborByServicemapId_properties_piers_edges_node_properties_berths_edges {
  __typename: "BerthNodeEdge";
  node: OFFER_PAGE_harborByServicemapId_properties_piers_edges_node_properties_berths_edges_node | null;
}

export interface OFFER_PAGE_harborByServicemapId_properties_piers_edges_node_properties_berths {
  __typename: "BerthNodeConnection";
  edges: (OFFER_PAGE_harborByServicemapId_properties_piers_edges_node_properties_berths_edges | null)[];
}

export interface OFFER_PAGE_harborByServicemapId_properties_piers_edges_node_properties {
  __typename: "PierProperties";
  identifier: string;
  berths: OFFER_PAGE_harborByServicemapId_properties_piers_edges_node_properties_berths;
}

export interface OFFER_PAGE_harborByServicemapId_properties_piers_edges_node {
  __typename: "PierNode";
  id: string;
  properties: OFFER_PAGE_harborByServicemapId_properties_piers_edges_node_properties | null;
}

export interface OFFER_PAGE_harborByServicemapId_properties_piers_edges {
  __typename: "PierNodeEdge";
  node: OFFER_PAGE_harborByServicemapId_properties_piers_edges_node | null;
}

export interface OFFER_PAGE_harborByServicemapId_properties_piers {
  __typename: "PierNodeConnection";
  edges: (OFFER_PAGE_harborByServicemapId_properties_piers_edges | null)[];
}

export interface OFFER_PAGE_harborByServicemapId_properties {
  __typename: "HarborProperties";
  name: string | null;
  piers: OFFER_PAGE_harborByServicemapId_properties_piers | null;
}

export interface OFFER_PAGE_harborByServicemapId {
  __typename: "HarborNode";
  id: string;
  properties: OFFER_PAGE_harborByServicemapId_properties | null;
}

export interface OFFER_PAGE {
  berthApplication: OFFER_PAGE_berthApplication | null;
  harborByServicemapId: OFFER_PAGE_harborByServicemapId | null;
}

export interface OFFER_PAGEVariables {
  applicationId: string;
  servicemapId: string;
}
