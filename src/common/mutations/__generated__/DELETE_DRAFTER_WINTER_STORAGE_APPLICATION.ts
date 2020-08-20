/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DeleteWinterStorageLeaseMutationInput } from "./../../../@types/__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: DELETE_DRAFTER_WINTER_STORAGE_APPLICATION
// ====================================================

export interface DELETE_DRAFTER_WINTER_STORAGE_APPLICATION_deleteWinterStorageLease {
  __typename: "DeleteWinterStorageLeaseMutationPayload";
  clientMutationId: string | null;
}

export interface DELETE_DRAFTER_WINTER_STORAGE_APPLICATION {
  deleteWinterStorageLease: DELETE_DRAFTER_WINTER_STORAGE_APPLICATION_deleteWinterStorageLease | null;
}

export interface DELETE_DRAFTER_WINTER_STORAGE_APPLICATIONVariables {
  input: DeleteWinterStorageLeaseMutationInput;
}
