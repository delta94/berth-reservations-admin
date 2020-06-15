/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateBerthProductMutationInput, PriceUnits } from "./../../../../@types/__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UPDATE_BERTH_PRICE
// ====================================================

export interface UPDATE_BERTH_PRICE_updateBerthProduct_berthProduct {
  __typename: "BerthProductNode";
  id: string;
  priceValue: any;
  priceUnit: PriceUnits;
}

export interface UPDATE_BERTH_PRICE_updateBerthProduct {
  __typename: "UpdateBerthProductMutationPayload";
  berthProduct: UPDATE_BERTH_PRICE_updateBerthProduct_berthProduct | null;
}

export interface UPDATE_BERTH_PRICE {
  updateBerthProduct: UPDATE_BERTH_PRICE_updateBerthProduct | null;
}

export interface UPDATE_BERTH_PRICEVariables {
  input: UpdateBerthProductMutationInput;
}
