import { BoatCertificateType } from '../../../@types/__generated__/globalTypes';
import { Boat, BoatCert, LargeBoat } from '../types';

const LARGE_BOAT_ID = '8';

export const isLargeBoat = (boat: LargeBoat | Boat): boat is LargeBoat =>
  (boat as LargeBoat).boatType.id === LARGE_BOAT_ID;

export const getCertificate = (
  certificates: BoatCert[],
  certificateType: BoatCertificateType
): BoatCert | undefined => {
  return certificates.find(cert => cert.certificateType === certificateType);
};

export const getFilename = (url: string | null): string | undefined => {
  if (!url) {
    return undefined;
  }

  return url.split('/').pop();
};

export const getValidUntilColor = (
  validUntil: string
): 'critical' | 'standard' => {
  const isBeforeToday =
    new Date(validUntil) < new Date(new Date().toDateString());
  return isBeforeToday ? 'critical' : 'standard';
};
