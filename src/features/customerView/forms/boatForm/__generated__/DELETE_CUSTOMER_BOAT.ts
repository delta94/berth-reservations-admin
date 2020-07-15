/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DeleteBoatMutationInput } from "./../../../../../@types/__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: DELETE_CUSTOMER_BOAT
// ====================================================

export interface DELETE_CUSTOMER_BOAT_deleteBoat {
  __typename: "DeleteBoatMutationPayload";
  clientMutationId: string | null;
}

export interface DELETE_CUSTOMER_BOAT {
  deleteBoat: DELETE_CUSTOMER_BOAT_deleteBoat | null;
}

export interface DELETE_CUSTOMER_BOATVariables {
  input: DeleteBoatMutationInput;
}
