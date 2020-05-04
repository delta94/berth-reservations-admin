import { BoatCertificateType } from '../../@types/__generated__/globalTypes';

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
