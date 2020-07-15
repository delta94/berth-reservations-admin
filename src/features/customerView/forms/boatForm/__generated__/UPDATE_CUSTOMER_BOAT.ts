/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateBoatMutationInput } from "./../../../../../@types/__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UPDATE_CUSTOMER_BOAT
// ====================================================

export interface UPDATE_CUSTOMER_BOAT_updateBoat {
  __typename: "UpdateBoatMutationPayload";
  clientMutationId: string | null;
}

export interface UPDATE_CUSTOMER_BOAT {
  updateBoat: UPDATE_CUSTOMER_BOAT_updateBoat | null;
}

export interface UPDATE_CUSTOMER_BOATVariables {
  input: UpdateBoatMutationInput;
}
