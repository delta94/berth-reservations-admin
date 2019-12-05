/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CUSTOMERS
// ====================================================

export interface CUSTOMERS_harbors_edges_node_properties_piers_edges_node_properties {
  __typename: "PierProperties";
  electricity: boolean;
  wasteCollection: boolean;
  gate: boolean;
  water: boolean;
  lighting: boolean;
}

export interface CUSTOMERS_harbors_edges_node_properties_piers_edges_node {
  __typename: "PierNode";
  properties: CUSTOMERS_harbors_edges_node_properties_piers_edges_node_properties | null;
}

export interface CUSTOMERS_harbors_edges_node_properties_piers_edges {
  __typename: "PierNodeEdge";
  /**
   * The item at the end of the edge
   */
  node: CUSTOMERS_harbors_edges_node_properties_piers_edges_node | null;
}

export interface CUSTOMERS_harbors_edges_node_properties_piers {
  __typename: "PierNodeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (CUSTOMERS_harbors_edges_node_properties_piers_edges | null)[];
}

export interface CUSTOMERS_harbors_edges_node_properties {
  __typename: "HarborProperties";
  name: string | null;
  numberOfPlaces: number | null;
  streetAddress: string | null;
  zipCode: string;
  municipality: string | null;
  wwwUrl: string;
  imageFile: string | null;
  /**
   * ID in the Servicemap system
   */
  servicemapId: string | null;
  maximumWidth: number | null;
  piers: CUSTOMERS_harbors_edges_node_properties_piers;
}

export interface CUSTOMERS_harbors_edges_node {
  __typename: "HarborNode";
  /**
   * The ID of the object.
   */
  id: string;
  properties: CUSTOMERS_harbors_edges_node_properties | null;
}

export interface CUSTOMERS_harbors_edges {
  __typename: "HarborNodeEdge";
  /**
   * The item at the end of the edge
   */
  node: CUSTOMERS_harbors_edges_node | null;
}

export interface CUSTOMERS_harbors {
  __typename: "HarborNodeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (CUSTOMERS_harbors_edges | null)[];
}

export interface CUSTOMERS {
  harbors: CUSTOMERS_harbors | null;
}
