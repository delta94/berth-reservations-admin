import { WinterStoragePricing as WinterStoragePricingData } from './__generated__/WinterStoragePricing';
import { WinterStoragePrice } from './WinterStoragePricing';
import { PeriodType } from '../../../@types/__generated__/globalTypes';

export const getWinterStorageData = (data: WinterStoragePricingData | undefined | null): WinterStoragePrice[] => {
  if (!data) return [];

  return data.edges.reduce<WinterStoragePrice[]>((acc, edge) => {
    if (!edge?.node) return acc;

    const priceValue = edge.node.properties?.product?.priceValue;
    const privateCustomer = Number.isNaN(priceValue) ? undefined : priceValue;
    const company = Number.isNaN(priceValue) ? undefined : priceValue * 2;

    const winterStorageArea = {
      id: edge.node.id,
      productId: edge.node.properties?.product?.id,
      area: edge.node.properties?.name,
      privateCustomer,
      company,
      period: PeriodType.SEASON,
    };

    return [...acc, winterStorageArea];
  }, []);
};
