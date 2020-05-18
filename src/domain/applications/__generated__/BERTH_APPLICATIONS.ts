/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ApplicationStatus } from "./../../../@types/__generated__/globalTypes";

// ====================================================
// GraphQL query operation: BERTH_APPLICATIONS
// ====================================================

export interface BERTH_APPLICATIONS_berthApplications_edges_node_customer {
  __typename: "ProfileNode";
  id: string;
}

export interface BERTH_APPLICATIONS_berthApplications_edges_node_berthSwitch_reason {
  __typename: "BerthSwitchReasonType";
  title: string | null;
}

export interface BERTH_APPLICATIONS_berthApplications_edges_node_berthSwitch {
  __typename: "BerthSwitchType";
  berthNumber: string;
  harbor: string;
  harborName: string;
  id: string;
  pier: string;
  reason: BERTH_APPLICATIONS_berthApplications_edges_node_berthSwitch_reason | null;
}

export interface BERTH_APPLICATIONS_berthApplications_edges_node_lease_berth_pier_properties_harbor_properties {
  __typename: "HarborProperties";
  name: string | null;
}

export interface BERTH_APPLICATIONS_berthApplications_edges_node_lease_berth_pier_properties_harbor {
  __typename: "HarborNode";
  id: string;
  properties: BERTH_APPLICATIONS_berthApplications_edges_node_lease_berth_pier_properties_harbor_properties | null;
}

export interface BERTH_APPLICATIONS_berthApplications_edges_node_lease_berth_pier_properties {
  __typename: "PierProperties";
  identifier: string;
  harbor: BERTH_APPLICATIONS_berthApplications_edges_node_lease_berth_pier_properties_harbor;
}

export interface BERTH_APPLICATIONS_berthApplications_edges_node_lease_berth_pier {
  __typename: "PierNode";
  properties: BERTH_APPLICATIONS_berthApplications_edges_node_lease_berth_pier_properties | null;
}

export interface BERTH_APPLICATIONS_berthApplications_edges_node_lease_berth {
  __typename: "BerthNode";
  number: number;
  pier: BERTH_APPLICATIONS_berthApplications_edges_node_lease_berth_pier;
}

export interface BERTH_APPLICATIONS_berthApplications_edges_node_lease {
  __typename: "BerthLeaseNode";
  id: string;
  berth: BERTH_APPLICATIONS_berthApplications_edges_node_lease_berth;
}

export interface BERTH_APPLICATIONS_berthApplications_edges_node_harborChoices {
  __typename: "HarborChoiceType";
  harbor: string;
  priority: number;
  harborName: string;
}

export interface BERTH_APPLICATIONS_berthApplications_edges_node {
  __typename: "BerthApplicationNode";
  id: string;
  customer: BERTH_APPLICATIONS_berthApplications_edges_node_customer | null;
  berthSwitch: BERTH_APPLICATIONS_berthApplications_edges_node_berthSwitch | null;
  createdAt: any;
  municipality: string;
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
  lease: BERTH_APPLICATIONS_berthApplications_edges_node_lease | null;
  harborChoices: (BERTH_APPLICATIONS_berthApplications_edges_node_harborChoices | null)[] | null;
}

export interface BERTH_APPLICATIONS_berthApplications_edges {
  __typename: "BerthApplicationNodeEdge";
  node: BERTH_APPLICATIONS_berthApplications_edges_node | null;
}

export interface BERTH_APPLICATIONS_berthApplications {
  __typename: "BerthApplicationNodeConnection";
  count: number;
  edges: (BERTH_APPLICATIONS_berthApplications_edges | null)[];
}

export interface BERTH_APPLICATIONS_boatTypes {
  __typename: "BoatTypeType";
  id: string;
  name: string | null;
}

export interface BERTH_APPLICATIONS {
  berthApplications: BERTH_APPLICATIONS_berthApplications | null;
  boatTypes: BERTH_APPLICATIONS_boatTypes[] | null;
}

export interface BERTH_APPLICATIONSVariables {
  first: number;
  after?: string | null;
  switchApplications?: boolean | null;
}
