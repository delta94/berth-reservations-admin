/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DeleteBerthMutationInput } from "./../../../../../@types/__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: DELETE_BERTH
// ====================================================

export interface DELETE_BERTH_deleteBerth {
  __typename: "DeleteBerthMutationPayload";
  clientMutationId: string | null;
}

export interface DELETE_BERTH {
  deleteBerth: DELETE_BERTH_deleteBerth | null;
}

export interface DELETE_BERTHVariables {
  input: DeleteBerthMutationInput;
}
