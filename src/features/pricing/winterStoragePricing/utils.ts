import { WinterStoragePricing as WinterStoragePricingData } from './__generated__/WinterStoragePricing';
import { WinterStoragePrice } from './WinterStoragePricing';
import { PeriodType } from '../../../@types/__generated__/globalTypes';
import { calcCompanyPrice } from '../utils';

export const getWinterStorageData = (data: WinterStoragePricingData | undefined | null): WinterStoragePrice[] => {
  if (!data) return [];

  return data.edges.reduce<WinterStoragePrice[]>((acc, edge) => {
    if (!edge?.node) return acc;

    const privateCustomer: number | null = edge.node.properties?.product?.priceValue;
    const company = calcCompanyPrice(privateCustomer);

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
