/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateWinterStorageApplicationInput } from "./../../../@types/__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UPDATE_UNMARKED_WINTER_STORAGE_NOTICE
// ====================================================

export interface UPDATE_UNMARKED_WINTER_STORAGE_NOTICE_updateWinterStorageApplication_winterStorageApplication_customer {
  __typename: "ProfileNode";
  id: string;
}

export interface UPDATE_UNMARKED_WINTER_STORAGE_NOTICE_updateWinterStorageApplication_winterStorageApplication {
  __typename: "WinterStorageApplicationNode";
  id: string;
  customer: UPDATE_UNMARKED_WINTER_STORAGE_NOTICE_updateWinterStorageApplication_winterStorageApplication_customer | null;
}

export interface UPDATE_UNMARKED_WINTER_STORAGE_NOTICE_updateWinterStorageApplication {
  __typename: "UpdateWinterStorageApplicationPayload";
  winterStorageApplication: UPDATE_UNMARKED_WINTER_STORAGE_NOTICE_updateWinterStorageApplication_winterStorageApplication | null;
}

export interface UPDATE_UNMARKED_WINTER_STORAGE_NOTICE {
  updateWinterStorageApplication: UPDATE_UNMARKED_WINTER_STORAGE_NOTICE_updateWinterStorageApplication | null;
}

export interface UPDATE_UNMARKED_WINTER_STORAGE_NOTICEVariables {
  input: UpdateWinterStorageApplicationInput;
}
