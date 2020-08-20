/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateWinterStorageApplicationInput } from "./../../../@types/__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UPDATE_WINTER_STORAGE_APPLICATION
// ====================================================

export interface UPDATE_WINTER_STORAGE_APPLICATION_updateWinterStorageApplication_winterStorageApplication_customer {
  __typename: "ProfileNode";
  id: string;
}

export interface UPDATE_WINTER_STORAGE_APPLICATION_updateWinterStorageApplication_winterStorageApplication {
  __typename: "WinterStorageApplicationNode";
  id: string;
  customer: UPDATE_WINTER_STORAGE_APPLICATION_updateWinterStorageApplication_winterStorageApplication_customer | null;
}

export interface UPDATE_WINTER_STORAGE_APPLICATION_updateWinterStorageApplication {
  __typename: "UpdateWinterStorageApplicationPayload";
  winterStorageApplication: UPDATE_WINTER_STORAGE_APPLICATION_updateWinterStorageApplication_winterStorageApplication | null;
}

export interface UPDATE_WINTER_STORAGE_APPLICATION {
  updateWinterStorageApplication: UPDATE_WINTER_STORAGE_APPLICATION_updateWinterStorageApplication | null;
}

export interface UPDATE_WINTER_STORAGE_APPLICATIONVariables {
  input: UpdateWinterStorageApplicationInput;
}
