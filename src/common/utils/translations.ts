import {
  PeriodType,
  ProductServiceType,
  AdditionalProductTaxEnum,
  PriceUnits,
} from '../../@types/__generated__/globalTypes';
import { formatPercentage } from './format';

export const getPeriodTKey = (period: PeriodType) => {
  switch (period) {
    case PeriodType.MONTH:
      return 'common.periodTypes.month';
    case PeriodType.SEASON:
      return 'common.periodTypes.season';
    case PeriodType.YEAR:
      return 'common.periodTypes.year';

    default:
      return period;
  }
};

export const getProductServiceTKey = (productService: ProductServiceType) => {
  switch (productService) {
    case ProductServiceType.DINGHY_PLACE:
      return 'common.terminology.dinghyPlace';
    case ProductServiceType.ELECTRICITY:
      return 'common.terminology.electricity';
    case ProductServiceType.GATE:
      return 'common.terminology.gate';
    case ProductServiceType.LIGHTING:
      return 'common.terminology.lighting';
    case ProductServiceType.MOORING:
      return 'common.terminology.mooring';
    case ProductServiceType.PARKING_PERMIT:
      return 'common.terminology.parkingPermit';
    case ProductServiceType.SUMMER_STORAGE_FOR_DOCKING_EQUIPMENT:
      return 'common.terminology.dockingEquipmentSummerStorage';
    case ProductServiceType.SUMMER_STORAGE_FOR_TRAILERS:
      return 'common.terminology.trawlerSummerStorage';
    case ProductServiceType.WASTE_COLLECTION:
      return 'common.terminology.wasteCollection';
    case ProductServiceType.WATER:
      return 'common.terminology.water';

    default:
      return productService;
  }
};

export const getProductTax = (tax: AdditionalProductTaxEnum, locale: string) => {
  switch (tax) {
    case AdditionalProductTaxEnum.TAX_10_00:
      return formatPercentage(0.1, locale);
    case AdditionalProductTaxEnum.TAX_24_00:
      return formatPercentage(0.24, locale);

    default:
      return tax;
  }
};

export const getPriceUnits = (unit: PriceUnits) => {
  switch (unit) {
    case PriceUnits.AMOUNT:
      return '€';
    case PriceUnits.PERCENTAGE:
      return '%';

    default:
      return unit;
  }
};
