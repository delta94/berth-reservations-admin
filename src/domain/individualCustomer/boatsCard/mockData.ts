import { BoatCert } from '../types';
import { BoatCertificateType } from '../../../@types/__generated__/globalTypes';

export const insuraceCert: BoatCert = {
  file:
    'https://venepaikka-api.test.hel.ninja/media/boats/2c736de2-5659-46ea-ad3f-9c1364307d7d/dummy_pdf2.pdf',
  certificateType: BoatCertificateType.INSURANCE,
  validUntil: null,
  checkedAt: '2020-04-28',
  checkedBy: null,
};

export const inspectionCert: BoatCert = {
  file: null,
  certificateType: BoatCertificateType.INSPECTION,
  validUntil: '2099-09-04',
  checkedAt: '2020-04-28',
  checkedBy: 'Jukka Virtanen',
};
