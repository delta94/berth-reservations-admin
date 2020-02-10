/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ApplicationStatus } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: BERTH_APPLICATIONS
// ====================================================

export interface BERTH_APPLICATIONS_berthApplications_edges_node_berthSwitch {
  __typename: "BerthSwitchType";
  id: string;
}

export interface BERTH_APPLICATIONS_berthApplications_edges_node_harborChoices {
  __typename: "HarborChoiceType";
  harbor: string;
  priority: number;
}

export interface BERTH_APPLICATIONS_berthApplications_edges_node {
  __typename: "BerthApplicationNode";
  id: string;
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
  status: ApplicationStatus | null;
  harborChoices: (BERTH_APPLICATIONS_berthApplications_edges_node_harborChoices | null)[] | null;
}

export interface BERTH_APPLICATIONS_berthApplications_edges {
  __typename: "BerthApplicationNodeEdge";
  node: BERTH_APPLICATIONS_berthApplications_edges_node | null;
}

export interface BERTH_APPLICATIONS_berthApplications {
  __typename: "BerthApplicationNodeConnection";
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
