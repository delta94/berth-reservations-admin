/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: WINTER_STORAGE_AREAS
// ====================================================

export interface WINTER_STORAGE_AREAS_winterStorageAreas_edges_node_properties {
  __typename: "WinterStorageAreaProperties";
  name: string | null;
}

export interface WINTER_STORAGE_AREAS_winterStorageAreas_edges_node {
  __typename: "WinterStorageAreaNode";
  id: string;
  properties: WINTER_STORAGE_AREAS_winterStorageAreas_edges_node_properties | null;
}

export interface WINTER_STORAGE_AREAS_winterStorageAreas_edges {
  __typename: "WinterStorageAreaNodeEdge";
  node: WINTER_STORAGE_AREAS_winterStorageAreas_edges_node | null;
}

export interface WINTER_STORAGE_AREAS_winterStorageAreas {
  __typename: "WinterStorageAreaNodeConnection";
  edges: (WINTER_STORAGE_AREAS_winterStorageAreas_edges | null)[];
}

export interface WINTER_STORAGE_AREAS {
  winterStorageAreas: WINTER_STORAGE_AREAS_winterStorageAreas | null;
}
