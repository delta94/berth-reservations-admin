/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateBerthApplicationInput } from "./../../../@types/__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UPDATE_BERTH_APPLICATION
// ====================================================

export interface UPDATE_BERTH_APPLICATION_updateBerthApplication_berthApplication_customer {
  __typename: "BerthProfileNode";
  id: string;
}

export interface UPDATE_BERTH_APPLICATION_updateBerthApplication_berthApplication {
  __typename: "BerthApplicationNode";
  id: string;
  customer: UPDATE_BERTH_APPLICATION_updateBerthApplication_berthApplication_customer | null;
}

export interface UPDATE_BERTH_APPLICATION_updateBerthApplication {
  __typename: "UpdateBerthApplicationPayload";
  berthApplication: UPDATE_BERTH_APPLICATION_updateBerthApplication_berthApplication | null;
}

export interface UPDATE_BERTH_APPLICATION {
  updateBerthApplication: UPDATE_BERTH_APPLICATION_updateBerthApplication | null;
}

export interface UPDATE_BERTH_APPLICATIONVariables {
  input: UpdateBerthApplicationInput;
}
