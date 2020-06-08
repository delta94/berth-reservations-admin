/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductServiceType, PriceUnits, PeriodType, AdditionalProductType, AdditionalProductTaxEnum } from "./../../../../@types/__generated__/globalTypes";

// ====================================================
// GraphQL fragment: AdditionalServicePricing
// ====================================================

export interface AdditionalServicePricing_edges_node {
  __typename: "AdditionalProductNode";
  id: string;
  service: ProductServiceType;
  priceValue: any;
  priceUnit: PriceUnits;
  period: PeriodType;
  productType: AdditionalProductType;
  taxPercentage: AdditionalProductTaxEnum;
}

export interface AdditionalServicePricing_edges {
  __typename: "AdditionalProductNodeEdge";
  node: AdditionalServicePricing_edges_node | null;
}

export interface AdditionalServicePricing {
  __typename: "AdditionalProductNodeConnection";
  edges: (AdditionalServicePricing_edges | null)[];
}
