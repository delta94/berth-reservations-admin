/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateBerthMutationInput } from "./../../../../../@types/__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UPDATE_BERTH
// ====================================================

export interface UPDATE_BERTH_updateBerth {
  __typename: "UpdateBerthMutationPayload";
  clientMutationId: string | null;
}

export interface UPDATE_BERTH {
  updateBerth: UPDATE_BERTH_updateBerth | null;
}

export interface UPDATE_BERTHVariables {
  input: UpdateBerthMutationInput;
}
