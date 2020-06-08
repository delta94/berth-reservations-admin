/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductServiceType, PriceUnits, PeriodType, AdditionalProductType, AdditionalProductTaxEnum } from "./../../../../@types/__generated__/globalTypes";

// ====================================================
// GraphQL fragment: HarborServicePricing
// ====================================================

export interface HarborServicePricing_edges_node {
  __typename: "AdditionalProductNode";
  id: string;
  service: ProductServiceType;
  priceValue: any;
  priceUnit: PriceUnits;
  period: PeriodType;
  productType: AdditionalProductType;
  taxPercentage: AdditionalProductTaxEnum;
}

export interface HarborServicePricing_edges {
  __typename: "AdditionalProductNodeEdge";
  node: HarborServicePricing_edges_node | null;
}

export interface HarborServicePricing {
  __typename: "AdditionalProductNodeConnection";
  edges: (HarborServicePricing_edges | null)[];
}
