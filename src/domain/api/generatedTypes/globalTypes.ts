/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

/**
 * An enumeration.
 */
export enum Language {
  EN = "EN",
  FI = "FI",
  SV = "SV",
}

export enum RelationshipTypeEnum {
  ADVOCATE = "ADVOCATE",
  OTHER_GUARDIAN = "OTHER_GUARDIAN",
  OTHER_RELATION = "OTHER_RELATION",
  PARENT = "PARENT",
}

export interface ChildInput {
  firstName?: string | null;
  lastName?: string | null;
  birthdate: any;
  postalCode?: string | null;
  relationship?: RelationshipInput | null;
}

export interface RelationshipInput {
  type?: RelationshipTypeEnum | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
