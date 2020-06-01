/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PIER_AND_BOAT_TYPES
// ====================================================

export interface PIER_AND_BOAT_TYPES_pier_properties_suitableBoatTypes {
  __typename: "BoatTypeType";
  id: string;
}

export interface PIER_AND_BOAT_TYPES_pier_properties {
  __typename: "PierProperties";
  identifier: string;
  suitableBoatTypes: PIER_AND_BOAT_TYPES_pier_properties_suitableBoatTypes[];
  mooring: boolean;
  lighting: boolean;
  electricity: boolean;
  gate: boolean;
  wasteCollection: boolean;
  water: boolean;
  personalElectricity: boolean;
}

export interface PIER_AND_BOAT_TYPES_pier {
  __typename: "PierNode";
  properties: PIER_AND_BOAT_TYPES_pier_properties | null;
}

export interface PIER_AND_BOAT_TYPES_boatTypes {
  __typename: "BoatTypeType";
  id: string;
  name: string | null;
}

export interface PIER_AND_BOAT_TYPES {
  pier: PIER_AND_BOAT_TYPES_pier | null;
  boatTypes: PIER_AND_BOAT_TYPES_boatTypes[] | null;
}

export interface PIER_AND_BOAT_TYPESVariables {
  id: string;
}
