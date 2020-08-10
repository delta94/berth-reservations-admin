/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateBerthLeaseMutationInput, LeaseStatus } from "./../../../@types/__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: CREATE_LEASE
// ====================================================

export interface CREATE_LEASE_createBerthLease_berthLease {
  __typename: "BerthLeaseNode";
  id: string;
  status: LeaseStatus;
}

export interface CREATE_LEASE_createBerthLease {
  __typename: "CreateBerthLeaseMutationPayload";
  berthLease: CREATE_LEASE_createBerthLease_berthLease | null;
}

export interface CREATE_LEASE {
  createBerthLease: CREATE_LEASE_createBerthLease | null;
}

export interface CREATE_LEASEVariables {
  input: CreateBerthLeaseMutationInput;
}
