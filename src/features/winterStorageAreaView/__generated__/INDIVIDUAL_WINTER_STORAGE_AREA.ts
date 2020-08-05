/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LeaseStatus } from "./../../../@types/__generated__/globalTypes";

// ====================================================
// GraphQL query operation: INDIVIDUAL_WINTER_STORAGE_AREA
// ====================================================

export interface INDIVIDUAL_WINTER_STORAGE_AREA_winterStorageArea_properties_maps {
  __typename: "WinterStorageAreaMapType";
  id: any;
  url: string;
}

export interface INDIVIDUAL_WINTER_STORAGE_AREA_winterStorageArea_properties_sections_edges_node_properties_places_edges_node_leases_edges_node_application_customer {
  __typename: "ProfileNode";
  id: string;
  firstName: string;
  lastName: string;
}

export interface INDIVIDUAL_WINTER_STORAGE_AREA_winterStorageArea_properties_sections_edges_node_properties_places_edges_node_leases_edges_node_application {
  __typename: "WinterStorageApplicationNode";
  createdAt: any;
  customer: INDIVIDUAL_WINTER_STORAGE_AREA_winterStorageArea_properties_sections_edges_node_properties_places_edges_node_leases_edges_node_application_customer | null;
}

export interface INDIVIDUAL_WINTER_STORAGE_AREA_winterStorageArea_properties_sections_edges_node_properties_places_edges_node_leases_edges_node {
  __typename: "WinterStorageLeaseNode";
  id: string;
  startDate: any;
  endDate: any;
  status: LeaseStatus;
  application: INDIVIDUAL_WINTER_STORAGE_AREA_winterStorageArea_properties_sections_edges_node_properties_places_edges_node_leases_edges_node_application | null;
}

export interface INDIVIDUAL_WINTER_STORAGE_AREA_winterStorageArea_properties_sections_edges_node_properties_places_edges_node_leases_edges {
  __typename: "WinterStorageLeaseNodeEdge";
  node: INDIVIDUAL_WINTER_STORAGE_AREA_winterStorageArea_properties_sections_edges_node_properties_places_edges_node_leases_edges_node | null;
}

export interface INDIVIDUAL_WINTER_STORAGE_AREA_winterStorageArea_properties_sections_edges_node_properties_places_edges_node_leases {
  __typename: "WinterStorageLeaseNodeConnection";
  edges: (INDIVIDUAL_WINTER_STORAGE_AREA_winterStorageArea_properties_sections_edges_node_properties_places_edges_node_leases_edges | null)[];
}

export interface INDIVIDUAL_WINTER_STORAGE_AREA_winterStorageArea_properties_sections_edges_node_properties_places_edges_node {
  __typename: "WinterStoragePlaceNode";
  id: string;
  number: number;
  width: number;
  length: number;
  isActive: boolean;
  leases: INDIVIDUAL_WINTER_STORAGE_AREA_winterStorageArea_properties_sections_edges_node_properties_places_edges_node_leases | null;
}

export interface INDIVIDUAL_WINTER_STORAGE_AREA_winterStorageArea_properties_sections_edges_node_properties_places_edges {
  __typename: "WinterStoragePlaceNodeEdge";
  node: INDIVIDUAL_WINTER_STORAGE_AREA_winterStorageArea_properties_sections_edges_node_properties_places_edges_node | null;
}

export interface INDIVIDUAL_WINTER_STORAGE_AREA_winterStorageArea_properties_sections_edges_node_properties_places {
  __typename: "WinterStoragePlaceNodeConnection";
  edges: (INDIVIDUAL_WINTER_STORAGE_AREA_winterStorageArea_properties_sections_edges_node_properties_places_edges | null)[];
}

export interface INDIVIDUAL_WINTER_STORAGE_AREA_winterStorageArea_properties_sections_edges_node_properties {
  __typename: "WinterStorageSectionProperties";
  identifier: string;
  electricity: boolean;
  water: boolean;
  gate: boolean;
  summerStorageForBoats: boolean;
  summerStorageForTrailers: boolean;
  summerStorageForDockingEquipment: boolean;
  places: INDIVIDUAL_WINTER_STORAGE_AREA_winterStorageArea_properties_sections_edges_node_properties_places;
}

export interface INDIVIDUAL_WINTER_STORAGE_AREA_winterStorageArea_properties_sections_edges_node {
  __typename: "WinterStorageSectionNode";
  id: string;
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
