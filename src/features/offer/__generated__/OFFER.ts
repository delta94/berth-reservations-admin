/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ApplicationStatus, BerthMooringType, LeaseStatus } from "./../../../@types/__generated__/globalTypes";

// ====================================================
// GraphQL query operation: OFFER
// ====================================================

export interface OFFER_berthApplication_berthSwitch {
  __typename: "BerthSwitchType";
  id: string;
}

export interface OFFER_berthApplication_customer {
  __typename: "ProfileNode";
  id: string;
}

export interface OFFER_berthApplication {
  __typename: "BerthApplicationNode";
  id: string;
  createdAt: any;
  status: ApplicationStatus;
  berthSwitch: OFFER_berthApplication_berthSwitch | null;
  customer: OFFER_berthApplication_customer | null;
  boatType: string | null;
  boatRegistrationNumber: string;
  boatName: string;
  boatModel: string;
  boatWidth: number;
  boatLength: number;
  boatDraught: number | null;
  boatWeight: number | null;
}

export interface OFFER_boatTypes {
  __typename: "BoatTypeType";
  id: string;
  name: string | null;
}

export interface OFFER_harborByServicemapId_properties_maps {
  __typename: "HarborMapType";
  id: any;
  url: string;
}

export interface OFFER_harborByServicemapId_properties_piers_edges_node_properties_berths_edges_node_leases_edges_node_customer {
  __typename: "ProfileNode";
  id: string;
  firstName: string;
  lastName: string;
}

export interface OFFER_harborByServicemapId_properties_piers_edges_node_properties_berths_edges_node_leases_edges_node {
  __typename: "BerthLeaseNode";
  status: LeaseStatus;
  startDate: any;
  endDate: any;
  isActive: boolean;
  customer: OFFER_harborByServicemapId_properties_piers_edges_node_properties_berths_edges_node_leases_edges_node_customer;
}

export interface OFFER_harborByServicemapId_properties_piers_edges_node_properties_berths_edges_node_leases_edges {
  __typename: "BerthLeaseNodeEdge";
  node: OFFER_harborByServicemapId_properties_piers_edges_node_properties_berths_edges_node_leases_edges_node | null;
}

export interface OFFER_harborByServicemapId_properties_piers_edges_node_properties_berths_edges_node_leases {
  __typename: "BerthLeaseNodeConnection";
  edges: (OFFER_harborByServicemapId_properties_piers_edges_node_properties_berths_edges_node_leases_edges | null)[];
}

export interface OFFER_harborByServicemapId_properties_piers_edges_node_properties_berths_edges_node {
  __typename: "BerthNode";
  id: string;
  number: number;
  width: number;
  length: number;
  depth: number | null;
  mooringType: BerthMooringType;
  comment: string;
  isAccessible: boolean | null;
  leases: OFFER_harborByServicemapId_properties_piers_edges_node_properties_berths_edges_node_leases | null;
}

export interface OFFER_harborByServicemapId_properties_piers_edges_node_properties_berths_edges {
  __typename: "BerthNodeEdge";
  node: OFFER_harborByServicemapId_properties_piers_edges_node_properties_berths_edges_node | null;
}

export interface OFFER_harborByServicemapId_properties_piers_edges_node_properties_berths {
  __typename: "BerthNodeConnection";
  edges: (OFFER_harborByServicemapId_properties_piers_edges_node_properties_berths_edges | null)[];
}

export interface OFFER_harborByServicemapId_properties_piers_edges_node_properties {
  __typename: "PierProperties";
  identifier: string;
  electricity: boolean;
  gate: boolean;
  water: boolean;
  lighting: boolean;
  wasteCollection: boolean;
  berths: OFFER_harborByServicemapId_properties_piers_edges_node_properties_berths;
}

export interface OFFER_harborByServicemapId_properties_piers_edges_node {
  __typename: "PierNode";
  id: string;
  properties: OFFER_harborByServicemapId_properties_piers_edges_node_properties | null;
}

export interface OFFER_harborByServicemapId_properties_piers_edges {
  __typename: "PierNodeEdge";
  node: OFFER_harborByServicemapId_properties_piers_edges_node | null;
}

export interface OFFER_harborByServicemapId_properties_piers {
  __typename: "PierNodeConnection";
  edges: (OFFER_harborByServicemapId_properties_piers_edges | null)[];
}

export interface OFFER_harborByServicemapId_properties {
  __typename: "HarborProperties";
  name: string | null;
  servicemapId: string | null;
  imageFile: string | null;
  maps: (OFFER_harborByServicemapId_properties_maps | null)[];
  streetAddress: string | null;
  municipality: string | null;
  zipCode: string;
  maxWidth: number | null;
  numberOfPlaces: number;
  numberOfFreePlaces: number;
  piers: OFFER_harborByServicemapId_properties_piers | null;
}

export interface OFFER_harborByServicemapId {
  __typename: "HarborNode";
  id: string;
  properties: OFFER_harborByServicemapId_properties | null;
}

export interface OFFER {
  berthApplication: OFFER_berthApplication | null;
  boatTypes: OFFER_boatTypes[] | null;
  harborByServicemapId: OFFER_harborByServicemapId | null;
}

export interface OFFERVariables {
  applicationId: string;
  servicemapId: string;
}
