import { AdditionalServicePricingProps, AdditionalService } from './AdditionalServicePricing';

export const getAdditionalServiceData = (data: AdditionalServicePricingProps['data']): AdditionalService[] => {
  if (!data) return [];

  return data.edges.reduce<AdditionalService[]>((acc, edge) => {
    if (!edge?.node) return acc;

    const berthPrice = {
      id: edge.node.id,
      service: edge.node.service,
      price: edge.node.priceValue,
      tax: edge.node.taxPercentage,
      period: edge.node.period,
    };

    return [...acc, berthPrice];
  }, []);
};
