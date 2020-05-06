/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BerthMooringType } from "./../../../@types/__generated__/globalTypes";

// ====================================================
// GraphQL query operation: INDIVIDUAL_HARBOR
// ====================================================

export interface INDIVIDUAL_HARBOR_harbor_properties_piers_edges_node_properties_suitableBoatTypes {
  __typename: "BoatTypeType";
  name: string | null;
}

export interface INDIVIDUAL_HARBOR_harbor_properties_piers_edges_node_properties_berths_edges_node {
  __typename: "BerthNode";
  id: string;
  number: number;
  width: number;
  length: number;
  mooringType: BerthMooringType;
}

export interface INDIVIDUAL_HARBOR_harbor_properties_piers_edges_node_properties_berths_edges {
  __typename: "BerthNodeEdge";
  node: INDIVIDUAL_HARBOR_harbor_properties_piers_edges_node_properties_berths_edges_node | null;
}

export interface INDIVIDUAL_HARBOR_harbor_properties_piers_edges_node_properties_berths {
  __typename: "BerthNodeConnection";
  edges: (INDIVIDUAL_HARBOR_harbor_properties_piers_edges_node_properties_berths_edges | null)[];
}

export interface INDIVIDUAL_HARBOR_harbor_properties_piers_edges_node_properties {
  __typename: "PierProperties";
  identifier: string;
  electricity: boolean;
  wasteCollection: boolean;
  water: boolean;
  lighting: boolean;
  gate: boolean;
  suitableBoatTypes: INDIVIDUAL_HARBOR_harbor_properties_piers_edges_node_properties_suitableBoatTypes[];
  berths: INDIVIDUAL_HARBOR_harbor_properties_piers_edges_node_properties_berths;
}

export interface INDIVIDUAL_HARBOR_harbor_properties_piers_edges_node {
  __typename: "PierNode";
  id: string;
  properties: INDIVIDUAL_HARBOR_harbor_properties_piers_edges_node_properties | null;
}

export interface INDIVIDUAL_HARBOR_harbor_properties_piers_edges {
  __typename: "PierNodeEdge";
  node: INDIVIDUAL_HARBOR_harbor_properties_piers_edges_node | null;
}

export interface INDIVIDUAL_HARBOR_harbor_properties_piers {
  __typename: "PierNodeConnection";
  edges: (INDIVIDUAL_HARBOR_harbor_properties_piers_edges | null)[];
}

export interface INDIVIDUAL_HARBOR_harbor_properties {
  __typename: "HarborProperties";
  name: string | null;
  numberOfPlaces: number;
  numberOfFreePlaces: number;
  streetAddress: string | null;
  zipCode: string;
  municipality: string | null;
  wwwUrl: string;
  imageFile: string | null;
  servicemapId: string | null;
  maxWidth: number | null;
  piers: INDIVIDUAL_HARBOR_harbor_properties_piers | null;
}

export interface INDIVIDUAL_HARBOR_harbor {
  __typename: "HarborNode";
  id: string;
  properties: INDIVIDUAL_HARBOR_harbor_properties | null;
}

export interface INDIVIDUAL_HARBOR {
  harbor: INDIVIDUAL_HARBOR_harbor | null;
}

export interface INDIVIDUAL_HARBORVariables {
  id: string;
}
