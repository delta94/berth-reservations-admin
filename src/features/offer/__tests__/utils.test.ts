import { getAllPiersIdentifiers, getHarbor, getOfferData } from '../utils';
import { OfferPageQueryData } from '../__fixtures__/mockData';

describe('utils', () => {
  describe('getOfferData', () => {
    it('should return offer data', () => {
      const berthData = getOfferData(OfferPageQueryData);

      expect(berthData).toMatchSnapshot();
    });
  });

  describe('getAllPiersIdentifiers', () => {
    it('should return pier tabs', () => {
      const harbor = getAllPiersIdentifiers(OfferPageQueryData);

      expect(harbor).toMatchSnapshot();
    });
  });

  describe('getHarbor', () => {
    it('should return null when the provided data is undefined', () => {
      expect(getHarbor(undefined)).toStrictEqual(null);
    });

    it('should return harbor', () => {
      const harbor = getHarbor(OfferPageQueryData);

      expect(harbor).toMatchSnapshot();
    });
  });
});
