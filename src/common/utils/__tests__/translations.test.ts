import i18n from 'i18next';

import { getPeriodTKey, getProductServiceTKey, getProductTax } from '../translations';
import { PeriodType, ProductServiceType, AdditionalProductTaxEnum } from '../../../@types/__generated__/globalTypes';
import { formatPercentage } from '../format';

jest.mock('../format');

describe('translations', () => {
  describe('getPeriodTKey', () => {
    test('each provided value of type PeriodType should have a corresponding translated value', () => {
      const periods = Object.values(PeriodType);
      expect.assertions(periods.length);

      periods.forEach((period) => {
        const tKey = getPeriodTKey(period);
        expect(i18n.exists(tKey)).toBe(true);
      });
    });

    it('should fallback to the actual value from the backend if there is no match during the runtime', () => {
      const randomValue: any = 'random';
      const tKey = getPeriodTKey(randomValue);

      expect(tKey).toBe(randomValue);
    });
  });

  describe('getProductServiceTKey', () => {
    test('each provided value of type ProductServiceType should have a corresponding translated value', () => {
      const services = Object.values(ProductServiceType);
      expect.assertions(services.length);

      services.forEach((service) => {
        const tKey = getProductServiceTKey(service);
        expect(i18n.exists(tKey)).toBe(true);
      });
    });

    it('should fallback to the actual value from the backend if there is no match during the runtime', () => {
      const randomValue: any = 'random';
      const tKey = getProductServiceTKey(randomValue);

      expect(tKey).toBe(randomValue);
    });
  });

  describe('getProductTax', () => {
    beforeEach(() => {
      jest.resetAllMocks();
    });

    test('each provided value of type AdditionalProductTaxEnum should have a corresponding formatted value', () => {
      const taxes = Object.values(AdditionalProductTaxEnum);

      taxes.forEach((tax) => {
        getProductTax(tax, 'fi');
      });

      expect(formatPercentage).toHaveBeenCalledTimes(taxes.length);
    });

    it('should fallback to the actual value from the backend if there is no match during the runtime', () => {
      const randomValue: any = 'random';
      const tKey = getProductTax(randomValue, 'fi');

      expect(tKey).toBe(randomValue);
    });
  });
});
