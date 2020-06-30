/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductServiceType, PriceUnits, PeriodType, AdditionalProductType } from "./../../../../@types/__generated__/globalTypes";

// ====================================================
// GraphQL fragment: AdditionalServices
// ====================================================

export interface AdditionalServices_additionalProducts_edges_node {
  __typename: "AdditionalProductNode";
  id: string;
  service: ProductServiceType;
  priceValue: any;
  priceUnit: PriceUnits;
  period: PeriodType;
  productType: AdditionalProductType;
}

export interface AdditionalServices_additionalProducts_edges {
  __typename: "AdditionalProductNodeEdge";
  node: AdditionalServices_additionalProducts_edges_node | null;
}

export interface AdditionalServices_additionalProducts {
  __typename: "AdditionalProductNodeConnection";
  edges: (AdditionalServices_additionalProducts_edges | null)[];
}

export interface AdditionalServices {
  __typename: "Query";
  additionalProducts: AdditionalServices_additionalProducts | null;
}
