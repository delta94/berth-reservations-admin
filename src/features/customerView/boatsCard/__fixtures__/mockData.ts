import { Boat, BoatCertificate, LargeBoat } from '../../types';
import { BoatCertificateType } from '../../../../@types/__generated__/globalTypes';

export const insuraceCert: BoatCertificate = {
  file: 'https://venepaikka-api.test.hel.ninja/media/boats/2c736de2-5659-46ea-ad3f-9c1364307d7d/dummy_pdf2.pdf',
  certificateType: BoatCertificateType.INSURANCE,
  validUntil: null,
  checkedAt: '2020-04-28',
  checkedBy: null,
};

export const inspectionCert: BoatCertificate = {
  file: null,
  certificateType: BoatCertificateType.INSPECTION,
  validUntil: '2099-09-04',
  checkedAt: '2020-04-28',
  checkedBy: 'Jukka Virtanen',
};

export const boat: Boat = {
  id: '1111',
  boatType: {
    id: '7',
    name: 'Troolari',
  },
  width: 2,
  length: 10,
  draught: 2,
  weight: 15000,
  name: 'Huh hah hei',
  model: 'Trawl 11',
  registrationNumber: 'TRLR-555',
};

export const largeBoat: LargeBoat = {
  id: '9999',
  boatType: {
    id: '8',
    name: 'Suuri alus (yli 20t)',
  },
  width: 4,
  length: 15,
  draught: 2,
  weight: 15000,
  name: 'DevilsDriver',
  model: 'Trawl 77',
  registrationNumber: 'TRLR-666',
  propulsion: 'Bensin',
  hullMaterial: 'Aluminium',
  intendedUse: 'For fun',
  certificates: [inspectionCert, insuraceCert],
};
