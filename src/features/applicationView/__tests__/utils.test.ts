import { getApplicationDetailsData, mapBerthApplicationLanguageToLanguage } from '../utils';
import { mockApplication, mockBerthSwitch, mockCustomer, mockLease } from '../__fixtures__/mockData';
import {
  INDIVIDUAL_APPLICATION_berthApplication as BERTH_APPLICATION,
  INDIVIDUAL_APPLICATION_boatTypes as BOAT_TYPES,
} from '../__generated__/INDIVIDUAL_APPLICATION';
import { BerthApplicationLanguage, Language } from '../../../@types/__generated__/globalTypes';
import { getCustomerProfile } from '../../customerView/utils';

describe('utils', () => {
  describe('mapBerthApplicationLanguageToLanguage', () => {
    it('should map FI to FINNISH', () => {
      expect(mapBerthApplicationLanguageToLanguage(BerthApplicationLanguage.FI)).toEqual(Language.FINNISH);
    });

    it('should map SV to SWEDISH', () => {
      expect(mapBerthApplicationLanguageToLanguage(BerthApplicationLanguage.SV)).toEqual(Language.SWEDISH);
    });

    it('should map EN to ENGLISH', () => {
      expect(mapBerthApplicationLanguageToLanguage(BerthApplicationLanguage.EN)).toEqual(Language.ENGLISH);
    });

    it('should map other values to null', () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      expect(mapBerthApplicationLanguageToLanguage('DE')).toEqual(null);
    });
  });

  describe('getCustomerProfile', () => {
    it('should get customer profile card props from profile data', () => {
      expect(getCustomerProfile(mockCustomer)).toMatchSnapshot();
    });
  });

  describe('getApplicationDetailsData', () => {
    it('should return berth application details', () => {
      expect(
        getApplicationDetailsData(
          {
            ...(mockApplication.berthApplication as BERTH_APPLICATION),
            customer: mockCustomer,
            berthSwitch: mockBerthSwitch,
            lease: mockLease,
          },
          mockApplication.boatTypes as BOAT_TYPES[]
        )
      ).toMatchSnapshot();
    });

    it('should map organizations as expected', () => {
      expect(
        getApplicationDetailsData(
          {
            ...(mockApplication.berthApplication as BERTH_APPLICATION),
            businessId: '1234567-8',
            companyName: 'Liikeyritys Oy',
            address: 'Liiketoimintaraitti 12',
            zipCode: '00100',
            municipality: 'Helsinki',
          },
          mockApplication.boatTypes as BOAT_TYPES[]
        )
      ).toMatchObject({
        applicant: {
          organization: {
            address: 'Liiketoimintaraitti 12',
            businessId: '1234567-8',
            city: 'Helsinki',
            name: 'Liikeyritys Oy',
            postalCode: '00100',
          },
        },
      });
    });

    it('should accept null berthApplication.berthSwitch.reason', () => {
      expect(
        getApplicationDetailsData(
          {
            ...(mockApplication.berthApplication as BERTH_APPLICATION),
            customer: mockCustomer,
            berthSwitch: {
              ...mockBerthSwitch,
              reason: null,
            },
            lease: mockLease,
          },
          mockApplication.boatTypes as BOAT_TYPES[]
        )
      ).toMatchObject({
        berthSwitch: {
          reason: null,
        },
      });
    });

    it('should accept null berthApplication.customer and boatTypes', () => {
      expect(getApplicationDetailsData(mockApplication.berthApplication as BERTH_APPLICATION, [])).toMatchObject({
        customerId: undefined,
        boatType: undefined,
      });
    });

    it('should accept null berthApplication.harborChoices', () => {
      expect(
        getApplicationDetailsData(
          {
            ...(mockApplication.berthApplication as BERTH_APPLICATION),
            customer: mockCustomer,
            berthSwitch: mockBerthSwitch,
            lease: mockLease,
            harborChoices: null,
          },
          mockApplication.boatTypes as BOAT_TYPES[]
        )
      ).toMatchObject({ choices: [] });
    });

    it('should accept null berthApplication.lease.berth.pier.properties', () => {
      expect(
        getApplicationDetailsData(
          {
            ...(mockApplication.berthApplication as BERTH_APPLICATION),
            customer: mockCustomer,
            berthSwitch: mockBerthSwitch,
            lease: {
              ...mockLease,
              berth: {
                ...mockLease.berth,
                pier: {
                  __typename: 'PierNode',
                  properties: null,
                },
              },
            },
          },
          mockApplication.boatTypes as BOAT_TYPES[]
        )
      ).toMatchObject({
        lease: {
          harborId: '',
          harborName: '',
          pierIdentifier: '',
        },
      });
    });

    it('should accept null berthApplication.lease.berth.pier.properties.harbor.properties', () => {
      expect(
        getApplicationDetailsData(
          {
            ...(mockApplication.berthApplication as BERTH_APPLICATION),
            customer: mockCustomer,
            berthSwitch: mockBerthSwitch,
            lease: {
              ...mockLease,
              berth: {
                ...mockLease.berth,
                pier: {
                  __typename: 'PierNode',
                  properties: {
                    __typename: 'PierProperties',
                    electricity: false,
                    gate: false,
                    harbor: {
                      __typename: 'HarborNode',
                      id: 'MOCK-HARBOR',
                      properties: null,
                    },
                    identifier: 'A',
                    lighting: false,
                    mooring: false,
                    wasteCollection: false,
                    water: false,
                  },
                },
              },
            },
          },
          mockApplication.boatTypes as BOAT_TYPES[]
        )
      ).toMatchObject({
        lease: {
          harborName: '',
        },
      });
    });
  });
});
