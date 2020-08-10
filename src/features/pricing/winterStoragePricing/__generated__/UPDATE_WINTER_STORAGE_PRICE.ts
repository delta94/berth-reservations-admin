/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateWinterStorageProductMutationInput, PriceUnits, PlaceProductTaxEnum } from "./../../../../@types/__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UPDATE_WINTER_STORAGE_PRICE
// ====================================================

export interface UPDATE_WINTER_STORAGE_PRICE_updateWinterStorageProduct_winterStorageProduct {
  __typename: "WinterStorageProductNode";
  id: string;
  priceValue: any;
  priceUnit: PriceUnits;
  taxPercentage: PlaceProductTaxEnum;
}

export interface UPDATE_WINTER_STORAGE_PRICE_updateWinterStorageProduct {
  __typename: "UpdateWinterStorageProductMutationPayload";
  winterStorageProduct: UPDATE_WINTER_STORAGE_PRICE_updateWinterStorageProduct_winterStorageProduct | null;
}

export interface UPDATE_WINTER_STORAGE_PRICE {
  updateWinterStorageProduct: UPDATE_WINTER_STORAGE_PRICE_updateWinterStorageProduct | null;
}

export interface UPDATE_WINTER_STORAGE_PRICEVariables {
  input: UpdateWinterStorageProductMutationInput;
}
