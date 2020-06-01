/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateHarborMutationInput } from "./../../../../../@types/__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UPDATE_HARBOR
// ====================================================

export interface UPDATE_HARBOR_updateHarbor {
  __typename: "UpdateHarborMutationPayload";
  clientMutationId: string | null;
}

export interface UPDATE_HARBOR {
  updateHarbor: UPDATE_HARBOR_updateHarbor | null;
}

export interface UPDATE_HARBORVariables {
  input: UpdateHarborMutationInput;
}
