import { getCertificate, getFilename, getValidUntilColor, isLargeBoat } from '../boatsCardUtils';
import { Boat, BoatCert, LargeBoat } from '../../types';
import { BoatCertificateType } from '../../../../@types/__generated__/globalTypes';
import { inspectionCert, insuraceCert } from '../__fixtures__/mockData';

const boat: Partial<Boat> = {
  id: '1',
  boatType: {
    id: '7',
    name: 'Troolari',
  },
};

const largeBoat: Partial<LargeBoat> = {
  id: '2',
  boatType: {
    id: '8',
    name: 'Suuri alus (yli 20t)',
  },
};

const certificates: BoatCert[] = [insuraceCert, inspectionCert];

describe('boat card utils', () => {
  describe('isLargeBoat', () => {
    it('should detect large boat', () => {
      expect(isLargeBoat(boat as LargeBoat)).toEqual(false);
      expect(isLargeBoat(largeBoat as LargeBoat)).toEqual(true);
    });
  });

  describe('getCertificate', () => {
    it('should get certificate by type', () => {
      expect(getCertificate(certificates, BoatCertificateType.INSURANCE)).toEqual(insuraceCert);
    });

    it('should tolerate empty array', () => {
      expect(getCertificate([], BoatCertificateType.INSURANCE)).toEqual(undefined);
    });
  });

  describe('getFilename', () => {
    it('should get filename', () => {
      expect(
        getFilename(
          'https://venepaikka-api.test.hel.ninja/media/boats/' + '2c736de2-5659-46ea-ad3f-9c1364307d7d/dummy_pdf1.pdf'
        )
      ).toEqual('dummy_pdf1.pdf');
    });
  });

  describe('getValidUntilColor', () => {
    it('should get correct color', () => {
      const currentDateAsIso = new Date().toISOString().substring(0, 10);

      expect(getValidUntilColor('2020-03-10')).toEqual('critical');
      expect(getValidUntilColor('2099-03-10')).toEqual('standard');
      expect(getValidUntilColor(currentDateAsIso)).toEqual('standard');
    });
  });
});
