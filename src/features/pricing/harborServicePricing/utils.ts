import { HarborServicePricing as HarborServicePricingData } from './__generated__/HarborServicePricing';
import { HarborService } from './HarborServicePricing';

export const getHarborServicesData = (data: HarborServicePricingData | null | undefined): HarborService[] => {
  if (!data) return [];

  return data.edges.reduce<HarborService[]>((acc, edge) => {
    if (!edge?.node) return acc;

    const berthPrice = {
      id: edge.node.id,
      service: edge.node.service,
      price: edge.node.priceValue,
      unit: edge.node.priceUnit,
      period: edge.node.period,
    };

    return [...acc, berthPrice];
  }, []);
};
