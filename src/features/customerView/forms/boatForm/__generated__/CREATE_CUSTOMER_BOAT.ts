/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateBoatMutationInput } from "./../../../../../@types/__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: CREATE_CUSTOMER_BOAT
// ====================================================

export interface CREATE_CUSTOMER_BOAT_createBoat {
  __typename: "CreateBoatMutationPayload";
  clientMutationId: string | null;
}

export interface CREATE_CUSTOMER_BOAT {
  createBoat: CREATE_CUSTOMER_BOAT_createBoat | null;
}

export interface CREATE_CUSTOMER_BOATVariables {
  input: CreateBoatMutationInput;
}
