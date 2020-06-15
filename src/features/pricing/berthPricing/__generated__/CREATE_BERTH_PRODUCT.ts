/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateBerthProductMutationInput, PriceUnits } from "./../../../../@types/__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: CREATE_BERTH_PRODUCT
// ====================================================

export interface CREATE_BERTH_PRODUCT_createBerthProduct_berthProduct {
  __typename: "BerthProductNode";
  id: string;
  priceValue: any;
  priceUnit: PriceUnits;
}

export interface CREATE_BERTH_PRODUCT_createBerthProduct {
  __typename: "CreateBerthProductMutationPayload";
  berthProduct: CREATE_BERTH_PRODUCT_createBerthProduct_berthProduct | null;
}

export interface CREATE_BERTH_PRODUCT {
  createBerthProduct: CREATE_BERTH_PRODUCT_createBerthProduct | null;
}

export interface CREATE_BERTH_PRODUCTVariables {
  input: CreateBerthProductMutationInput;
}
