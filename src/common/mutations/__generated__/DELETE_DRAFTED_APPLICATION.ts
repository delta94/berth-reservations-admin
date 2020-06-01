/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DeleteBerthLeaseMutationInput } from "../../../@types/__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: DELETE_DRAFTED_APPLICATION
// ====================================================

export interface DELETE_DRAFTED_APPLICATION_deleteBerthLease {
  __typename: "DeleteBerthLeaseMutationPayload";
  clientMutationId: string | null;
}

export interface DELETE_DRAFTED_APPLICATION {
  deleteBerthLease: DELETE_DRAFTED_APPLICATION_deleteBerthLease | null;
}

export interface DELETE_DRAFTED_APPLICATIONVariables {
  input: DeleteBerthLeaseMutationInput;
}
