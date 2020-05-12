/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DeletePierMutationInput } from "./../../../../../@types/__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: DELETE_PIER
// ====================================================

export interface DELETE_PIER_deletePier {
  __typename: "DeletePierMutationPayload";
  clientMutationId: string | null;
}

export interface DELETE_PIER {
  deletePier: DELETE_PIER_deletePier | null;
}

export interface DELETE_PIERVariables {
  input: DeletePierMutationInput;
}
