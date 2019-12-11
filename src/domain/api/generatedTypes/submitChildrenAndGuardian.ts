/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ChildInput, Language } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: submitChildrenAndGuardian
// ====================================================

export interface submitChildrenAndGuardian_submitChildrenAndGuardian_children {
  birthdate: any;
  firstName: string;
  lastName: string;
}

export interface submitChildrenAndGuardian_submitChildrenAndGuardian_guardian {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  language: Language | null;
}

export interface submitChildrenAndGuardian_submitChildrenAndGuardian {
  children: (submitChildrenAndGuardian_submitChildrenAndGuardian_children | null)[] | null;
  guardian: submitChildrenAndGuardian_submitChildrenAndGuardian_guardian | null;
}

export interface submitChildrenAndGuardian {
  submitChildrenAndGuardian: submitChildrenAndGuardian_submitChildrenAndGuardian | null;
}

export interface submitChildrenAndGuardianVariables {
  children?: (ChildInput | null)[] | null;
  guardianFirstName: string;
  guardianLastName: string;
  phoneNumber: string;
  language: Language;
}
