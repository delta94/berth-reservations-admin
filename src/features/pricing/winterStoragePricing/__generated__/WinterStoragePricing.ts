/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PriceUnits } from "./../../../../@types/__generated__/globalTypes";

// ====================================================
// GraphQL fragment: WinterStoragePricing
// ====================================================

export interface WinterStoragePricing_edges_node_properties_product {
  __typename: "WinterStorageProductNode";
  priceValue: any;
  priceUnit: PriceUnits;
}

export interface WinterStoragePricing_edges_node_properties {
  __typename: "WinterStorageAreaProperties";
  name: string | null;
  product: WinterStoragePricing_edges_node_properties_product | null;
}

export interface WinterStoragePricing_edges_node {
  __typename: "WinterStorageAreaNode";
  id: string;
  properties: WinterStoragePricing_edges_node_properties | null;
}

export interface WinterStoragePricing_edges {
  __typename: "WinterStorageAreaNodeEdge";
  node: WinterStoragePricing_edges_node | null;
}

export interface WinterStoragePricing {
  __typename: "WinterStorageAreaNodeConnection";
  edges: (WinterStoragePricing_edges | null)[];
}
