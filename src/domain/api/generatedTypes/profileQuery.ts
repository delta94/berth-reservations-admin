/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: profileQuery
// ====================================================

export interface profileQuery_guardians_edges_node_children_edges_node {
  /**
   * The ID of the object.
   */
  id: string;
  firstName: string;
  lastName: string;
  birthdate: any;
}

export interface profileQuery_guardians_edges_node_children_edges {
  /**
   * The item at the end of the edge
   */
  node: profileQuery_guardians_edges_node_children_edges_node | null;
}

export interface profileQuery_guardians_edges_node_children {
  /**
   * Contains the nodes in this connection.
   */
  edges: (profileQuery_guardians_edges_node_children_edges | null)[];
}

export interface profileQuery_guardians_edges_node {
  /**
   * The ID of the object.
   */
  id: string;
  firstName: string;
  lastName: string;
  email: string | null;
  phoneNumber: string;
  children: profileQuery_guardians_edges_node_children;
}

export interface profileQuery_guardians_edges {
  /**
   * The item at the end of the edge
   */
  node: profileQuery_guardians_edges_node | null;
}

export interface profileQuery_guardians {
  /**
   * Contains the nodes in this connection.
   */
  edges: (profileQuery_guardians_edges | null)[];
}

export interface profileQuery {
  guardians: profileQuery_guardians | null;
}
