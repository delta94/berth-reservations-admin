/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateBerthMutationInput } from "./../../../../../@types/__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: CREATE_BERTH
// ====================================================

export interface CREATE_BERTH_createBerth {
  __typename: "CreateBerthMutationPayload";
  clientMutationId: string | null;
}

export interface CREATE_BERTH {
  createBerth: CREATE_BERTH_createBerth | null;
}

export interface CREATE_BERTHVariables {
  input: CreateBerthMutationInput;
}
