/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PriceUnits } from "./../../../../@types/__generated__/globalTypes";

// ====================================================
// GraphQL fragment: BerthPricing
// ====================================================

export interface BerthPricing_edges_node_defaultProduct {
  __typename: "BerthProductNode";
  priceUnit: PriceUnits;
  priceValue: any;
}

export interface BerthPricing_edges_node {
  __typename: "BerthPriceGroupNode";
  id: string;
  name: string;
  defaultProduct: BerthPricing_edges_node_defaultProduct | null;
}

export interface BerthPricing_edges {
  __typename: "BerthPriceGroupNodeEdge";
  node: BerthPricing_edges_node | null;
}

export interface BerthPricing {
  __typename: "BerthPriceGroupNodeConnection";
  edges: (BerthPricing_edges | null)[];
}
