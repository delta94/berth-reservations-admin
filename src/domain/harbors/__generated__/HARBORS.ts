/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: HARBORS
// ====================================================

export interface HARBORS_harbors_edges_node_properties {
  __typename: "HarborProperties";
  municipality: string | null;
  imageFile: string | null;
  numberOfPlaces: number | null;
  name: string | null;
  streetAddress: string | null;
}

export interface HARBORS_harbors_edges_node {
  __typename: "HarborNode";
  /**
   * The ID of the object.
   */
  id: string;
  properties: HARBORS_harbors_edges_node_properties | null;
}

export interface HARBORS_harbors_edges {
  __typename: "HarborNodeEdge";
  /**
   * The item at the end of the edge
   */
  node: HARBORS_harbors_edges_node | null;
}

export interface HARBORS_harbors {
  __typename: "HarborNodeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (HARBORS_harbors_edges | null)[];
}

export interface HARBORS {
  harbors: HARBORS_harbors | null;
}
