/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum AdditionalProductTaxEnum {
  TAX_10_00 = "TAX_10_00",
  TAX_24_00 = "TAX_24_00",
}

export enum AdditionalProductType {
  FIXED_SERVICE = "FIXED_SERVICE",
  OPTIONAL_SERVICE = "OPTIONAL_SERVICE",
}

export enum ApplicationStatus {
  EXPIRED = "EXPIRED",
  HANDLED = "HANDLED",
  NO_SUITABLE_BERTHS = "NO_SUITABLE_BERTHS",
  NO_SUITABLE_BERTHS_NOTIFIED = "NO_SUITABLE_BERTHS_NOTIFIED",
  OFFER_GENERATED = "OFFER_GENERATED",
  OFFER_SENT = "OFFER_SENT",
  PENDING = "PENDING",
}

export enum BerthApplicationLanguage {
  EN = "EN",
  FI = "FI",
  SV = "SV",
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

export enum Language {
  ENGLISH = "ENGLISH",
  FINNISH = "FINNISH",
  SWEDISH = "SWEDISH",
}

export enum LeaseStatus {
  DRAFTED = "DRAFTED",
  EXPIRED = "EXPIRED",
  OFFERED = "OFFERED",
  PAID = "PAID",
  REFUSED = "REFUSED",
}

export enum OrderStatus {
  EXPIRED = "EXPIRED",
  PAID = "PAID",
  REJECTED = "REJECTED",
  WAITING = "WAITING",
}

export enum OrganizationType {
  COMPANY = "COMPANY",
  INTERNAL = "INTERNAL",
  NON_BILLABLE = "NON_BILLABLE",
  OTHER = "OTHER",
}

export enum PeriodType {
  MONTH = "MONTH",
  SEASON = "SEASON",
  YEAR = "YEAR",
}

export enum PlaceProductTaxEnum {
  TAX_24_00 = "TAX_24_00",
}

export enum PriceUnits {
  AMOUNT = "AMOUNT",
  PERCENTAGE = "PERCENTAGE",
}

export enum ProductServiceType {
  DINGHY_PLACE = "DINGHY_PLACE",
  ELECTRICITY = "ELECTRICITY",
  GATE = "GATE",
  LIGHTING = "LIGHTING",
  MOORING = "MOORING",
  PARKING_PERMIT = "PARKING_PERMIT",
  SUMMER_STORAGE_FOR_DOCKING_EQUIPMENT = "SUMMER_STORAGE_FOR_DOCKING_EQUIPMENT",
  SUMMER_STORAGE_FOR_TRAILERS = "SUMMER_STORAGE_FOR_TRAILERS",
  WASTE_COLLECTION = "WASTE_COLLECTION",
  WATER = "WATER",
}

export enum ServiceType {
  BERTH = "BERTH",
  GODCHILDREN_OF_CULTURE = "GODCHILDREN_OF_CULTURE",
  HKI_MY_DATA = "HKI_MY_DATA",
  YOUTH_MEMBERSHIP = "YOUTH_MEMBERSHIP",
}

export interface AddBoatCertificateInput {
  file?: any | null;
  certificateType: BoatCertificateType;
  validUntil?: any | null;
  checkedAt?: any | null;
  checkedBy?: string | null;
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

export interface CreateBerthProductMutationInput {
  priceValue: any;
  priceGroupId: string;
  harborId?: string | null;
  clientMutationId?: string | null;
}

export interface CreateBoatMutationInput {
  boatTypeId: string;
  registrationNumber?: string | null;
  name?: string | null;
  model?: string | null;
  length: any;
  width: any;
  draught?: any | null;
  weight?: number | null;
  propulsion?: string | null;
  hullMaterial?: string | null;
  intendedUse?: string | null;
  addBoatCertificates?: (AddBoatCertificateInput | null)[] | null;
  ownerId: string;
  clientMutationId?: string | null;
}

export interface CreateOrderLineMutationInput {
  quantity?: number | null;
  orderId: string;
  productId: string;
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

export interface CreateWinterStorageProductMutationInput {
  priceValue: any;
  winterStorageAreaId?: string | null;
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

export interface DeleteBoatMutationInput {
  id: string;
  clientMutationId?: string | null;
}

export interface DeleteOrderLineMutationInput {
  id: string;
  clientMutationId?: string | null;
}

export interface DeletePierMutationInput {
  id: string;
  clientMutationId?: string | null;
}

export interface UpdateAdditionalProductMutationInput {
  service?: ProductServiceType | null;
  period?: PeriodType | null;
  priceValue?: any | null;
  priceUnit?: PriceUnits | null;
  taxPercentage?: AdditionalProductTaxEnum | null;
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

export interface UpdateBerthProductMutationInput {
  id: string;
  priceValue?: any | null;
  priceGroupId?: string | null;
  harborId?: string | null;
  clientMutationId?: string | null;
}

export interface UpdateBoatCertificateInput {
  file?: any | null;
  certificateType?: BoatCertificateType | null;
  validUntil?: any | null;
  checkedAt?: any | null;
  checkedBy?: string | null;
  id: string;
}

export interface UpdateBoatMutationInput {
  boatTypeId?: string | null;
  registrationNumber?: string | null;
  name?: string | null;
  model?: string | null;
  length?: any | null;
  width?: any | null;
  draught?: any | null;
  weight?: number | null;
  propulsion?: string | null;
  hullMaterial?: string | null;
  intendedUse?: string | null;
  addBoatCertificates?: (AddBoatCertificateInput | null)[] | null;
  id: string;
  updateBoatCertificates?: (UpdateBoatCertificateInput | null)[] | null;
  removeBoatCertificates?: (string | null)[] | null;
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

export interface UpdateWinterStorageProductMutationInput {
  id: string;
  priceValue?: any | null;
  winterStorageAreaId?: string | null;
  clientMutationId?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
