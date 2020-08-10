/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BerthMooringType, ProductServiceType, AdditionalProductType } from "./../../../../@types/__generated__/globalTypes";

// ====================================================
// GraphQL fragment: BerthLease
// ====================================================

export interface BerthLease_lease_berth_pier_properties_harbor_properties {
  __typename: "HarborProperties";
  name: string | null;
}

export interface BerthLease_lease_berth_pier_properties_harbor {
  __typename: "HarborNode";
  id: string;
  properties: BerthLease_lease_berth_pier_properties_harbor_properties | null;
}

export interface BerthLease_lease_berth_pier_properties {
  __typename: "PierProperties";
  identifier: string;
  electricity: boolean;
  gate: boolean;
  lighting: boolean;
  mooring: boolean;
  wasteCollection: boolean;
  water: boolean;
  harbor: BerthLease_lease_berth_pier_properties_harbor;
}

export interface BerthLease_lease_berth_pier {
  __typename: "PierNode";
  properties: BerthLease_lease_berth_pier_properties | null;
}

export interface BerthLease_lease_berth {
  __typename: "BerthNode";
  depth: number | null;
  length: number;
  mooringType: BerthMooringType;
  width: number;
  comment: string;
  isAccessible: boolean | null;
  number: number;
  pier: BerthLease_lease_berth_pier;
}

export interface BerthLease_lease_order_orderLines_edges_node_product {
  __typename: "AdditionalProductNode";
  id: string;
  service: ProductServiceType;
  productType: AdditionalProductType;
}

export interface BerthLease_lease_order_orderLines_edges_node {
  __typename: "OrderLineNode";
  id: string;
  price: any;
  product: BerthLease_lease_order_orderLines_edges_node_product | null;
}

export interface BerthLease_lease_order_orderLines_edges {
  __typename: "OrderLineNodeEdge";
  node: BerthLease_lease_order_orderLines_edges_node | null;
}

export interface BerthLease_lease_order_orderLines {
  __typename: "OrderLineNodeConnection";
  edges: (BerthLease_lease_order_orderLines_edges | null)[];
}

export interface BerthLease_lease_order {
  __typename: "OrderNode";
  id: string;
  price: any;
  totalPrice: any;
  orderLines: BerthLease_lease_order_orderLines;
}

export interface BerthLease_lease {
  __typename: "BerthLeaseNode";
  id: string;
  berth: BerthLease_lease_berth;
  order: BerthLease_lease_order | null;
}

export interface BerthLease {
  __typename: "BerthApplicationNode";
  lease: BerthLease_lease | null;
}
