/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdatePierMutationInput } from "./../../../../../@types/__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UPDATE_PIER
// ====================================================

export interface UPDATE_PIER_updatePier {
  __typename: "UpdatePierMutationPayload";
  clientMutationId: string | null;
}

export interface UPDATE_PIER {
  updatePier: UPDATE_PIER_updatePier | null;
}

export interface UPDATE_PIERVariables {
  input: UpdatePierMutationInput;
}
