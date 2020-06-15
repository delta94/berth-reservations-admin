/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateAdditionalProductMutationInput, PriceUnits, ProductServiceType, PeriodType, AdditionalProductTaxEnum, AdditionalProductType } from "./../../../../@types/__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UPDATE_HARBOR_SERVICE_PRICE
// ====================================================

export interface UPDATE_HARBOR_SERVICE_PRICE_updateAdditionalProduct_additionalProduct {
  __typename: "AdditionalProductNode";
  id: string;
  priceValue: any;
  priceUnit: PriceUnits;
  service: ProductServiceType;
  period: PeriodType;
  taxPercentage: AdditionalProductTaxEnum;
  productType: AdditionalProductType;
}

export interface UPDATE_HARBOR_SERVICE_PRICE_updateAdditionalProduct {
  __typename: "UpdateAdditionalProductMutationPayload";
  additionalProduct: UPDATE_HARBOR_SERVICE_PRICE_updateAdditionalProduct_additionalProduct | null;
}

export interface UPDATE_HARBOR_SERVICE_PRICE {
  updateAdditionalProduct: UPDATE_HARBOR_SERVICE_PRICE_updateAdditionalProduct | null;
}

export interface UPDATE_HARBOR_SERVICE_PRICEVariables {
  input: UpdateAdditionalProductMutationInput;
}
