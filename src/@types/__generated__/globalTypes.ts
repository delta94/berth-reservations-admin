/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum ApplicationStatus {
  EXPIRED = "EXPIRED",
  HANDLED = "HANDLED",
  NO_SUITABLE_BERTHS = "NO_SUITABLE_BERTHS",
  NO_SUITABLE_BERTHS_NOTIFIED = "NO_SUITABLE_BERTHS_NOTIFIED",
  OFFER_GENERATED = "OFFER_GENERATED",
  OFFER_SENT = "OFFER_SENT",
  PENDING = "PENDING",
}

export enum BerthMooringType {
  DINGHY_PLACE = "DINGHY_PLACE",
  NO_STERN_TO_MOORING = "NO_STERN_TO_MOORING",
  QUAYSIDE_MOORING = "QUAYSIDE_MOORING",
  SEA_BUOY_MOORING = "SEA_BUOY_MOORING",
  SIDE_SLIP_PLACE = "SIDE_SLIP_PLACE",
  SINGLE_SLIP_PLACE = "SINGLE_SLIP_PLACE",
  STERN_BUOY_PLACE = "STERN_BUOY_PLACE",
  STERN_POLE_MOORING = "STERN_POLE_MOORING",
  TRAWLER_PLACE = "TRAWLER_PLACE",
}

export enum BoatCertificateType {
  INSPECTION = "INSPECTION",
  INSURANCE = "INSURANCE",
}

export enum ContactMethod {
  EMAIL = "EMAIL",
  SMS = "SMS",
}

export enum InvoicingType {
  DIGITAL_INVOICE = "DIGITAL_INVOICE",
  ONLINE_PAYMENT = "ONLINE_PAYMENT",
  PAPER_INVOICE = "PAPER_INVOICE",
}

export enum LeaseStatus {
  DRAFTED = "DRAFTED",
  EXPIRED = "EXPIRED",
  OFFERED = "OFFERED",
  PAID = "PAID",
  REFUSED = "REFUSED",
}

export enum OrganizationType {
  COMPANY = "COMPANY",
  INTERNAL = "INTERNAL",
  NON_BILLABLE = "NON_BILLABLE",
  OTHER = "OTHER",
}

export enum ServiceType {
  BERTH = "BERTH",
  GODCHILDREN_OF_CULTURE = "GODCHILDREN_OF_CULTURE",
  HKI_MY_DATA = "HKI_MY_DATA",
  YOUTH_MEMBERSHIP = "YOUTH_MEMBERSHIP",
}

export interface CreateBerthLeaseMutationInput {
  boatId?: string | null;
  startDate?: any | null;
  endDate?: any | null;
  comment?: string | null;
  applicationId: string;
  berthId: string;
  clientMutationId?: string | null;
}

export interface CreateBerthMutationInput {
  number: number;
  isActive?: boolean | null;
  pierId: string;
  comment?: string | null;
  isAccessible?: boolean | null;
  width: number;
  length: number;
  depth?: number | null;
  mooringType: BerthMooringType;
  clientMutationId?: string | null;
}

export interface CreatePierMutationInput {
  identifier?: string | null;
  location?: any | null;
  electricity?: boolean | null;
  water?: boolean | null;
  gate?: boolean | null;
  harborId: string;
  suitableBoatTypes?: (string | null)[] | null;
  mooring?: boolean | null;
  wasteCollection?: boolean | null;
  lighting?: boolean | null;
  personalElectricity?: boolean | null;
  clientMutationId?: string | null;
}

export interface DeleteBerthLeaseMutationInput {
  id: string;
  clientMutationId?: string | null;
}

export interface DeleteBerthMutationInput {
  id: string;
  clientMutationId?: string | null;
}

export interface DeletePierMutationInput {
  id: string;
  clientMutationId?: string | null;
}

export interface UpdateBerthApplicationInput {
  customerId: string;
  id: string;
  clientMutationId?: string | null;
}

export interface UpdateBerthMutationInput {
  number?: number | null;
  isActive?: boolean | null;
  pierId?: string | null;
  comment?: string | null;
  isAccessible?: boolean | null;
  width?: number | null;
  length?: number | null;
  depth?: number | null;
  mooringType?: BerthMooringType | null;
  id: string;
  clientMutationId?: string | null;
}

export interface UpdateHarborMutationInput {
  servicemapId?: string | null;
  zipCode?: string | null;
  phone?: string | null;
  email?: string | null;
  wwwUrl?: string | null;
  location?: any | null;
  imageLink?: string | null;
  municipalityId?: string | null;
  imageFile?: any | null;
  addMapFiles?: (any | null)[] | null;
  availabilityLevelId?: string | null;
  name?: string | null;
  streetAddress?: string | null;
  id: string;
  removeMapFiles?: (string | null)[] | null;
  clientMutationId?: string | null;
}

export interface UpdatePierMutationInput {
  identifier?: string | null;
  location?: any | null;
  electricity?: boolean | null;
  water?: boolean | null;
  gate?: boolean | null;
  harborId?: string | null;
  suitableBoatTypes?: (string | null)[] | null;
  mooring?: boolean | null;
  wasteCollection?: boolean | null;
  lighting?: boolean | null;
  personalElectricity?: boolean | null;
  id: string;
  clientMutationId?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
