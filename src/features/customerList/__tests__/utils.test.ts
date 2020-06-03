import { getCustomersData } from '../utils';
import { customersResponse } from '../__mocks__/customersMockResponse';

describe('utils', () => {
  describe('getCustomersData', () => {
    it('should get profile', () => {
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
    });

    it('should get boats', () => {
      const profile = getCustomersData(customersResponse)[0];

      expect(profile.boats.length).toEqual(1);
      const boat = profile.boats[0];
      expect(boat.id).toBeDefined();
      expect(boat.name).toEqual('BigBoiShip');
    });

    it('should get applications', () => {
      const profile = getCustomersData(customersResponse)[0];

      expect(profile.applications.length).toEqual(1);
      const application = profile.applications[0];
      expect(application.id).toBeDefined();
      expect(application.createdAt).toEqual('2020-05-27T08:56:05.630976+00:00');
    });

    it('should get berthLeases', () => {
      const profile = getCustomersData(customersResponse)[0];

      expect(profile.berthLeases.length).toEqual(2);
      const berthLease = profile.berthLeases[0];
      expect(berthLease.id).toBeDefined();
      expect(berthLease.title).toEqual('Puotilan venesatama A 37');
    });
  });
});
