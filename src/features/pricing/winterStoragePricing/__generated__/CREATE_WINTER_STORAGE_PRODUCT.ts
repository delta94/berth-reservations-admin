/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateWinterStorageProductMutationInput, PriceUnits, PlaceProductTaxEnum } from "./../../../../@types/__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: CREATE_WINTER_STORAGE_PRODUCT
// ====================================================

export interface CREATE_WINTER_STORAGE_PRODUCT_createWinterStorageProduct_winterStorageProduct {
  __typename: "WinterStorageProductNode";
  id: string;
  priceValue: any;
  priceUnit: PriceUnits;
  taxPercentage: PlaceProductTaxEnum;
}

export interface CREATE_WINTER_STORAGE_PRODUCT_createWinterStorageProduct {
  __typename: "CreateWinterStorageProductMutationPayload";
  winterStorageProduct: CREATE_WINTER_STORAGE_PRODUCT_createWinterStorageProduct_winterStorageProduct | null;
}

export interface CREATE_WINTER_STORAGE_PRODUCT {
  createWinterStorageProduct: CREATE_WINTER_STORAGE_PRODUCT_createWinterStorageProduct | null;
}

export interface CREATE_WINTER_STORAGE_PRODUCTVariables {
  input: CreateWinterStorageProductMutationInput;
}
