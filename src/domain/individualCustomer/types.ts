import {
  ApplicationStatus,
  BoatCertificateType,
} from '../../@types/__generated__/globalTypes';

export interface Boat {
  id: string;
  boatType: { id: string; name: string | null };
  registrationNumber: string;
  width: number;
  length: number;
  draught: number | null;
  weight: number | null;
  name: string;
  model: string;
}

export interface LargeBoat extends Boat {
  propulsion: string;
  hullMaterial: string;
  intendedUse: string;
  certificates: BoatCert[];
}

export interface BoatCert {
  file: string | null;
  certificateType: BoatCertificateType;
  validUntil: string | null;
  checkedAt: string;
  checkedBy: string | null;
}

export interface HarborChoice {
  harbor: string;
  harborName: string;
  priority: number;
}

export interface ApplicationLease {
  id: string;
  berthNum: string | number;
  harborId: string;
  harborName: string;
  pierIdentifier: string;
}

export interface BerthSwitch {
  harborId: string;
  harborName: string;
  berthNum: string | number;
  pierIdentifier: string;
  reason: string | null;
}

export interface Application {
  id: string;
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
  harborChoices: Array<HarborChoice | null>;
  accessibilityRequired: boolean;
}
