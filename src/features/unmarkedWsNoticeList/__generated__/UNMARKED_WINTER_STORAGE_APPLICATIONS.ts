/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ApplicationStatus } from "./../../../@types/__generated__/globalTypes";

// ====================================================
// GraphQL query operation: UNMARKED_WINTER_STORAGE_APPLICATIONS
// ====================================================

export interface UNMARKED_WINTER_STORAGE_APPLICATIONS_winterStorageApplications_edges_node_customer {
  __typename: "ProfileNode";
  id: string;
}

export interface UNMARKED_WINTER_STORAGE_APPLICATIONS_winterStorageApplications_edges_node_winterStorageAreaChoices {
  __typename: "WinterStorageAreaChoiceType";
  priority: number;
  winterStorageAreaName: string;
  winterStorageArea: string | null;
}

export interface UNMARKED_WINTER_STORAGE_APPLICATIONS_winterStorageApplications_edges_node {
  __typename: "WinterStorageApplicationNode";
  id: string;
  status: ApplicationStatus;
  createdAt: any;
  municipality: string;
  customer: UNMARKED_WINTER_STORAGE_APPLICATIONS_winterStorageApplications_edges_node_customer | null;
  boatType: string | null;
  boatRegistrationNumber: string;
  boatWidth: number;
  boatLength: number;
  boatName: string;
  boatModel: string;
  winterStorageAreaChoices: (UNMARKED_WINTER_STORAGE_APPLICATIONS_winterStorageApplications_edges_node_winterStorageAreaChoices | null)[] | null;
}

export interface UNMARKED_WINTER_STORAGE_APPLICATIONS_winterStorageApplications_edges {
  __typename: "WinterStorageApplicationNodeEdge";
  node: UNMARKED_WINTER_STORAGE_APPLICATIONS_winterStorageApplications_edges_node | null;
}

export interface UNMARKED_WINTER_STORAGE_APPLICATIONS_winterStorageApplications {
  __typename: "WinterStorageApplicationNodeConnection";
  count: number;
  edges: (UNMARKED_WINTER_STORAGE_APPLICATIONS_winterStorageApplications_edges | null)[];
}

export interface UNMARKED_WINTER_STORAGE_APPLICATIONS_boatTypes {
  __typename: "BoatTypeType";
  id: string;
  name: string | null;
}

export interface UNMARKED_WINTER_STORAGE_APPLICATIONS {
  winterStorageApplications: UNMARKED_WINTER_STORAGE_APPLICATIONS_winterStorageApplications | null;
  boatTypes: UNMARKED_WINTER_STORAGE_APPLICATIONS_boatTypes[] | null;
}

export interface UNMARKED_WINTER_STORAGE_APPLICATIONSVariables {
  first: number;
  after?: string | null;
  orderBy?: string | null;
}
