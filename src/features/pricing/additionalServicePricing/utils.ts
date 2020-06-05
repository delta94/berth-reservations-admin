import i18n from 'i18next';

import { AdditionalServicePricingProps, AdditionalService } from './AdditionalServicePricing';
import { PriceUnits } from '../../../@types/__generated__/globalTypes';
import { formatPrice, formatPercentage } from '../../../common/utils/format';

export const getAdditionalServiceData = (data: AdditionalServicePricingProps['data']): AdditionalService[] => {
  if (!data) return [];

  return data.edges.reduce<AdditionalService[]>((acc, edge) => {
    if (!edge?.node) return acc;

    let price: string = edge.node.priceValue;

    switch (edge.node.priceUnit) {
      case PriceUnits.AMOUNT:
        price = formatPrice(edge.node.priceValue, i18n.language);
        break;
      case PriceUnits.PERCENTAGE:
        price = formatPercentage(edge.node.priceValue, i18n.language);
        break;
    }

    const berthPrice = {
      id: edge.node.id,
      service: edge.node.service,
      price,
      tax: edge.node.taxPercentage,
      period: edge.node.period,
    };

    return [...acc, berthPrice];
  }, []);
};
