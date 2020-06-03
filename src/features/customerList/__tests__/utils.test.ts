import { getCustomersData } from '../utils';
import { CUSTOMERS } from '../__generated__/CUSTOMERS';
import { ContactMethod, ServiceType } from '../../../@types/__generated__/globalTypes';
import { customersResponse } from '../__mocks__/customersMockResponse';

describe('utils', () => {
  describe('getCustomersData', () => {
    it('should convert data', () => {
      const customersData = getCustomersData(customersResponse);

      expect(customersData.length).toEqual(1);

      const profile = customersData[0];
      expect(profile.name).toEqual('Toivonen Tellervo');
      expect(profile.address).toEqual('Jämsänkatu 372');
      expect(profile.city).toEqual('Eurajoki');
      expect(profile.postalCode).toEqual('62761');
      expect(profile.email).toEqual('tellervo@foobar.com');
      expect(profile.phone).toEqual('+358 494817677');
      expect(profile.comment).toEqual('Asiakas ku asiakas.');

      expect(profile.boats.length).toEqual(1);
      const boat = profile.boats[0];
      expect(boat.name).toEqual('BigBoiShip');

      expect(profile.applications.length).toEqual(1);
      const application = profile.applications[0];
      expect(application.createdAt).toEqual('2020-05-27T08:56:05.630976+00:00');

      expect(profile.berthLeases.length).toEqual(2);
      const berthLease = profile.berthLeases[0];
      expect(berthLease.title).toEqual('Puotilan venesatama A 37');
    });
  });
});
