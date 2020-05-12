/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreatePierMutationInput } from "./../../../../../@types/__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: CREATE_PIER
// ====================================================

export interface CREATE_PIER_createPier {
  __typename: "CreatePierMutationPayload";
  clientMutationId: string | null;
}

export interface CREATE_PIER {
  createPier: CREATE_PIER_createPier | null;
}

export interface CREATE_PIERVariables {
  input: CreatePierMutationInput;
}
