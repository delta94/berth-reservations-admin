/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DeleteOrderLineMutationInput } from "./../../../../../@types/__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: DELETE_ORDER_LINE
// ====================================================

export interface DELETE_ORDER_LINE_deleteOrderLine {
  __typename: "DeleteOrderLineMutationPayload";
  clientMutationId: string | null;
}

export interface DELETE_ORDER_LINE {
  deleteOrderLine: DELETE_ORDER_LINE_deleteOrderLine | null;
}

export interface DELETE_ORDER_LINEVariables {
  input: DeleteOrderLineMutationInput;
}
