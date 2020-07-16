import {
  ApplicationStatus,
  BoatCertificateType,
  OrderStatus,
  ProductServiceType,
} from '../../@types/__generated__/globalTypes';
import { INDIVIDUAL_CUSTOMER_boatTypes as IndividualCustomerBoatType } from './__generated__/INDIVIDUAL_CUSTOMER';

export type Boat = {
  id: string;
  boatType: { id: string; name: string | null };
  registrationNumber: string;
  width: number;
  length: number;
  draught: number | null;
  weight: number | null;
  name: string;
  model: string;
};

export type LargeBoat = Boat & {
  propulsion: string;
  hullMaterial: string;
  intendedUse: string;
  certificates: BoatCertificate[];
};

export type BoatCertificate = {
  file: string | null;
  certificateType: BoatCertificateType;
  validUntil: string | null;
  checkedAt: string;
  checkedBy: string | null;
};

export type HarborChoice = {
  harbor: string;
  harborName: string;
  priority: number;
};

export type ApplicationLease = {
  id: string;
  berthNum: string | number;
  harborId: string;
  harborName: string;
  pierIdentifier: string;
};

export type BerthSwitch = {
  harborId: string;
  harborName: string;
  berthNum: string | number;
  pierIdentifier: string;
  reason: string | null;
};

export type Application = {
  id: string;
  customerId: string;
  berthSwitch: BerthSwitch | null;
  createdAt: string;
  queue: number | null;
  status: ApplicationStatus;
  lease: ApplicationLease | null;
  boatType?: string | null;
  boatRegistrationNumber: string;
  boatWidth: number;
  boatLength: number;
  boatDraught: number | null;
  boatWeight: number | null;
  boatName: string;
  boatModel: string;
  choices: Array<HarborChoice>;
  accessibilityRequired: boolean;
};

export type Lease = {
  id: string;
  harbor: { id: string; name: string } | null;
  berthNum: string | number;
  pierIdentifier: string | null;
  startDate: string;
  endDate: string;
};

export type OrderLine = {
  product: ProductServiceType;
  price: number;
  taxPercentage: number;
};

export type Bill = {
  status: OrderStatus;
  contractPeriod: {
    startDate: string;
    endDate: string;
  };
  dueDate: string;
  totalPrice: number;
  totalPriceTaxPercentage: number;
  basePrice: number;
  basePriceTaxPercentage: number;
  orderLines: OrderLine[];
};

export type BerthBill = Bill & {
  berthInformation: {
    number: number;
    pierIdentifier: string;
    harborName: string;
  };
};

export type WinterStorageBill = Bill;

export type BoatType = Omit<IndividualCustomerBoatType, '__typename__'>;
