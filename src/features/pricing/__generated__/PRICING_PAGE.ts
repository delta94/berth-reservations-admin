/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PriceUnits, ProductServiceType, PeriodType, AdditionalProductType, AdditionalProductTaxEnum } from "./../../../@types/__generated__/globalTypes";

// ====================================================
// GraphQL query operation: PRICING_PAGE
// ====================================================

export interface PRICING_PAGE_berthPriceGroups_edges_node_defaultProduct {
  __typename: "BerthProductNode";
  priceUnit: PriceUnits;
  priceValue: any;
}

export interface PRICING_PAGE_berthPriceGroups_edges_node {
  __typename: "BerthPriceGroupNode";
  id: string;
  name: string;
  defaultProduct: PRICING_PAGE_berthPriceGroups_edges_node_defaultProduct | null;
}

export interface PRICING_PAGE_berthPriceGroups_edges {
  __typename: "BerthPriceGroupNodeEdge";
  node: PRICING_PAGE_berthPriceGroups_edges_node | null;
}

export interface PRICING_PAGE_berthPriceGroups {
  __typename: "BerthPriceGroupNodeConnection";
  edges: (PRICING_PAGE_berthPriceGroups_edges | null)[];
}

export interface PRICING_PAGE_winterStorageAreas_edges_node_properties_product {
  __typename: "WinterStorageProductNode";
  priceValue: any;
  priceUnit: PriceUnits;
}

export interface PRICING_PAGE_winterStorageAreas_edges_node_properties {
  __typename: "WinterStorageAreaProperties";
  name: string | null;
  product: PRICING_PAGE_winterStorageAreas_edges_node_properties_product | null;
}

export interface PRICING_PAGE_winterStorageAreas_edges_node {
  __typename: "WinterStorageAreaNode";
  id: string;
  properties: PRICING_PAGE_winterStorageAreas_edges_node_properties | null;
}

export interface PRICING_PAGE_winterStorageAreas_edges {
  __typename: "WinterStorageAreaNodeEdge";
  node: PRICING_PAGE_winterStorageAreas_edges_node | null;
}

export interface PRICING_PAGE_winterStorageAreas {
  __typename: "WinterStorageAreaNodeConnection";
  edges: (PRICING_PAGE_winterStorageAreas_edges | null)[];
}

export interface PRICING_PAGE_additionalProducts_edges_node {
  __typename: "AdditionalProductNode";
  id: string;
  service: ProductServiceType;
  priceValue: any;
  priceUnit: PriceUnits;
  period: PeriodType;
  productType: AdditionalProductType;
  taxPercentage: AdditionalProductTaxEnum;
}

export interface PRICING_PAGE_additionalProducts_edges {
  __typename: "AdditionalProductNodeEdge";
  node: PRICING_PAGE_additionalProducts_edges_node | null;
}

export interface PRICING_PAGE_additionalProducts {
  __typename: "AdditionalProductNodeConnection";
  edges: (PRICING_PAGE_additionalProducts_edges | null)[];
}

export interface PRICING_PAGE_optionalProducts_edges_node {
  __typename: "AdditionalProductNode";
  id: string;
  service: ProductServiceType;
  priceValue: any;
  priceUnit: PriceUnits;
  period: PeriodType;
  productType: AdditionalProductType;
  taxPercentage: AdditionalProductTaxEnum;
}

export interface PRICING_PAGE_optionalProducts_edges {
  __typename: "AdditionalProductNodeEdge";
  node: PRICING_PAGE_optionalProducts_edges_node | null;
}

export interface PRICING_PAGE_optionalProducts {
  __typename: "AdditionalProductNodeConnection";
  edges: (PRICING_PAGE_optionalProducts_edges | null)[];
}

export interface PRICING_PAGE {
  berthPriceGroups: PRICING_PAGE_berthPriceGroups | null;
  winterStorageAreas: PRICING_PAGE_winterStorageAreas | null;
  additionalProducts: PRICING_PAGE_additionalProducts | null;
  optionalProducts: PRICING_PAGE_optionalProducts | null;
}
