/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: HARBOR_FORM
// ====================================================

export interface HARBOR_FORM_harbor_properties_maps {
  __typename: "HarborMapType";
  id: any;
  url: string;
}

export interface HARBOR_FORM_harbor_properties {
  __typename: "HarborProperties";
  name: string | null;
  streetAddress: string | null;
  zipCode: string;
  municipality: string | null;
  wwwUrl: string;
  imageFile: string | null;
  maps: (HARBOR_FORM_harbor_properties_maps | null)[];
}

export interface HARBOR_FORM_harbor {
  __typename: "HarborNode";
  id: string;
  properties: HARBOR_FORM_harbor_properties | null;
}

export interface HARBOR_FORM {
  harbor: HARBOR_FORM_harbor | null;
}

export interface HARBOR_FORMVariables {
  id: string;
}
