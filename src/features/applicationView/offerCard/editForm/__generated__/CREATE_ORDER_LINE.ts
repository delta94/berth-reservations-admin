/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateOrderLineMutationInput, ProductServiceType, AdditionalProductType } from "./../../../../../@types/__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: CREATE_ORDER_LINE
// ====================================================

export interface CREATE_ORDER_LINE_createOrderLine_order_orderLines_edges_node_product {
  __typename: "AdditionalProductNode";
  id: string;
  service: ProductServiceType;
  productType: AdditionalProductType;
}

export interface CREATE_ORDER_LINE_createOrderLine_order_orderLines_edges_node {
  __typename: "OrderLineNode";
  id: string;
  price: any;
  product: CREATE_ORDER_LINE_createOrderLine_order_orderLines_edges_node_product | null;
}

export interface CREATE_ORDER_LINE_createOrderLine_order_orderLines_edges {
  __typename: "OrderLineNodeEdge";
  node: CREATE_ORDER_LINE_createOrderLine_order_orderLines_edges_node | null;
}

export interface CREATE_ORDER_LINE_createOrderLine_order_orderLines {
  __typename: "OrderLineNodeConnection";
  edges: (CREATE_ORDER_LINE_createOrderLine_order_orderLines_edges | null)[];
}

export interface CREATE_ORDER_LINE_createOrderLine_order {
  __typename: "OrderNode";
  id: string;
  price: any;
  totalPrice: any;
  orderLines: CREATE_ORDER_LINE_createOrderLine_order_orderLines;
}

export interface CREATE_ORDER_LINE_createOrderLine {
  __typename: "CreateOrderLineMutationPayload";
  order: CREATE_ORDER_LINE_createOrderLine_order | null;
}

export interface CREATE_ORDER_LINE {
  createOrderLine: CREATE_ORDER_LINE_createOrderLine | null;
}

export interface CREATE_ORDER_LINEVariables {
  input: CreateOrderLineMutationInput;
}
