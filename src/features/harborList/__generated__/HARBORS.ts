/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: HARBORS
// ====================================================

export interface HARBORS_harbors_edges_node_properties_maps {
  __typename: "HarborMapType";
  id: any;
  url: string;
}

export interface HARBORS_harbors_edges_node_properties_piers_edges_node_properties {
  __typename: "PierProperties";
  electricity: boolean;
  wasteCollection: boolean;
  gate: boolean;
  water: boolean;
  lighting: boolean;
}

export interface HARBORS_harbors_edges_node_properties_piers_edges_node {
  __typename: "PierNode";
  id: string;
  properties: HARBORS_harbors_edges_node_properties_piers_edges_node_properties | null;
}

export interface HARBORS_harbors_edges_node_properties_piers_edges {
  __typename: "PierNodeEdge";
  node: HARBORS_harbors_edges_node_properties_piers_edges_node | null;
}

export interface HARBORS_harbors_edges_node_properties_piers {
  __typename: "PierNodeConnection";
  edges: (HARBORS_harbors_edges_node_properties_piers_edges | null)[];
}

export interface HARBORS_harbors_edges_node_properties {
  __typename: "HarborProperties";
  name: string | null;
  numberOfPlaces: number;
  numberOfInactivePlaces: number;
  numberOfFreePlaces: number;
  streetAddress: string | null;
  zipCode: string;
  municipality: string | null;
  wwwUrl: string;
  imageFile: string | null;
  maps: (HARBORS_harbors_edges_node_properties_maps | null)[];
  servicemapId: string | null;
  maxWidth: number | null;
  piers: HARBORS_harbors_edges_node_properties_piers | null;
}

export interface HARBORS_harbors_edges_node {
  __typename: "HarborNode";
  id: string;
  properties: HARBORS_harbors_edges_node_properties | null;
}

export interface HARBORS_harbors_edges {
  __typename: "HarborNodeEdge";
  node: HARBORS_harbors_edges_node | null;
}

export interface HARBORS_harbors {
  __typename: "HarborNodeConnection";
  edges: (HARBORS_harbors_edges | null)[];
}

export interface HARBORS {
  harbors: HARBORS_harbors | null;
}
