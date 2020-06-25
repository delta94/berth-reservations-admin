/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: INDIVIDUAL_WINTER_STORAGE_AREA
// ====================================================

export interface INDIVIDUAL_WINTER_STORAGE_AREA_winterStorageArea_properties_maps {
  __typename: "WinterStorageAreaMapType";
  id: any;
  url: string;
}

export interface INDIVIDUAL_WINTER_STORAGE_AREA_winterStorageArea_properties_sections_edges_node_properties {
  __typename: "WinterStorageSectionProperties";
  electricity: boolean;
  water: boolean;
  gate: boolean;
  summerStorageForBoats: boolean;
  summerStorageForTrailers: boolean;
  summerStorageForDockingEquipment: boolean;
}

export interface INDIVIDUAL_WINTER_STORAGE_AREA_winterStorageArea_properties_sections_edges_node {
  __typename: "WinterStorageSectionNode";
  properties: INDIVIDUAL_WINTER_STORAGE_AREA_winterStorageArea_properties_sections_edges_node_properties | null;
}

export interface INDIVIDUAL_WINTER_STORAGE_AREA_winterStorageArea_properties_sections_edges {
  __typename: "WinterStorageSectionNodeEdge";
  node: INDIVIDUAL_WINTER_STORAGE_AREA_winterStorageArea_properties_sections_edges_node | null;
}

export interface INDIVIDUAL_WINTER_STORAGE_AREA_winterStorageArea_properties_sections {
  __typename: "WinterStorageSectionNodeConnection";
  edges: (INDIVIDUAL_WINTER_STORAGE_AREA_winterStorageArea_properties_sections_edges | null)[];
}

export interface INDIVIDUAL_WINTER_STORAGE_AREA_winterStorageArea_properties {
  __typename: "WinterStorageAreaProperties";
  name: string | null;
  servicemapId: string | null;
  zipCode: string;
  municipality: string | null;
  streetAddress: string | null;
  wwwUrl: string;
  imageFile: string | null;
  maps: (INDIVIDUAL_WINTER_STORAGE_AREA_winterStorageArea_properties_maps | null)[];
  sections: INDIVIDUAL_WINTER_STORAGE_AREA_winterStorageArea_properties_sections;
}

export interface INDIVIDUAL_WINTER_STORAGE_AREA_winterStorageArea {
  __typename: "WinterStorageAreaNode";
  properties: INDIVIDUAL_WINTER_STORAGE_AREA_winterStorageArea_properties | null;
}

export interface INDIVIDUAL_WINTER_STORAGE_AREA {
  winterStorageArea: INDIVIDUAL_WINTER_STORAGE_AREA_winterStorageArea | null;
}

export interface INDIVIDUAL_WINTER_STORAGE_AREAVariables {
  id: string;
}
