/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductServiceType, PriceUnits, PeriodType, AdditionalProductType } from "./../../../../../@types/__generated__/globalTypes";

// ====================================================
// GraphQL query operation: ORDER_OPTIONAL_PRODUCTS
// ====================================================

export interface ORDER_OPTIONAL_PRODUCTS_additionalProducts_edges_node {
  __typename: "AdditionalProductNode";
  id: string;
  service: ProductServiceType;
  priceValue: any;
  priceUnit: PriceUnits;
  period: PeriodType;
  productType: AdditionalProductType;
}

export interface ORDER_OPTIONAL_PRODUCTS_additionalProducts_edges {
  __typename: "AdditionalProductNodeEdge";
  node: ORDER_OPTIONAL_PRODUCTS_additionalProducts_edges_node | null;
}

export interface ORDER_OPTIONAL_PRODUCTS_additionalProducts {
  __typename: "AdditionalProductNodeConnection";
  edges: (ORDER_OPTIONAL_PRODUCTS_additionalProducts_edges | null)[];
}

export interface ORDER_OPTIONAL_PRODUCTS {
  additionalProducts: ORDER_OPTIONAL_PRODUCTS_additionalProducts | null;
}
