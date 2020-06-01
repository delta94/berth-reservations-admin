/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BerthMooringType } from "./../../../../../@types/__generated__/globalTypes";

// ====================================================
// GraphQL query operation: INDIVIDUAL_BERTH
// ====================================================

export interface INDIVIDUAL_BERTH_berth_pier_properties {
  __typename: "PierProperties";
  identifier: string;
}

export interface INDIVIDUAL_BERTH_berth_pier {
  __typename: "PierNode";
  id: string;
  properties: INDIVIDUAL_BERTH_berth_pier_properties | null;
}

export interface INDIVIDUAL_BERTH_berth {
  __typename: "BerthNode";
  number: number;
  comment: string;
  isActive: boolean;
  pier: INDIVIDUAL_BERTH_berth_pier;
  mooringType: BerthMooringType;
  width: number;
  length: number;
  depth: number | null;
}

export interface INDIVIDUAL_BERTH {
  berth: INDIVIDUAL_BERTH_berth | null;
}

export interface INDIVIDUAL_BERTHVariables {
  id: string;
}
