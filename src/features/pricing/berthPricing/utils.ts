import { BerthPricing as BerthPricingData } from './__generated__/BerthPricing';
import { BerthPrice } from './BerthPricing';
import { PeriodType } from '../../../@types/__generated__/globalTypes';

export const getBerthsData = (data: BerthPricingData | null | undefined): BerthPrice[] => {
  if (!data) return [];

  return data.edges.reduce<BerthPrice[]>((acc, edge) => {
    if (!edge?.node) return acc;

    const priceValue = Number(edge.node.defaultProduct?.priceValue);
    const privateCustomer = Number.isNaN(priceValue) ? undefined : priceValue;
    const company = Number.isNaN(priceValue) ? undefined : priceValue * 2;

    const berthPrice = {
      id: edge.node.id,
      productId: edge.node.defaultProduct?.id,
      name: edge.node.name,
      privateCustomer,
      company,
      period: PeriodType.SEASON,
    };

    return [...acc, berthPrice];
  }, []);
};
