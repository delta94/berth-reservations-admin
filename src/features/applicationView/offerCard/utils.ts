import { AdditionalProductType } from '../../../@types/__generated__/globalTypes';
import { BerthLease_lease as BerthLease } from './__generated__/BerthLease';
import { LeaseDetails, Product } from './OfferCard';

export const getOfferDetailsData = (lease: BerthLease | null): LeaseDetails | null => {
  if (!lease) return null;

  let order: LeaseDetails['order'] = null;

  if (lease.order) {
    const products = lease.order.orderLines.edges.reduce<{ fixedProducts: Product[]; optionalProducts: Product[] }>(
      (acc, edge) => {
        if (!edge?.node?.product) return acc;

        const product: Product = {
          id: edge.node.product.id,
          name: edge.node.product.service,
          price: edge.node.price,
          orderId: edge.node.id,
        };

        switch (edge.node.product.productType) {
          case AdditionalProductType.FIXED_SERVICE:
            return { ...acc, fixedProducts: [...acc.fixedProducts, product] };
          case AdditionalProductType.OPTIONAL_SERVICE:
            return { ...acc, optionalProducts: [...acc.optionalProducts, product] };
          default:
            return acc;
        }
      },
      { fixedProducts: [], optionalProducts: [] }
    ) ?? { fixedProducts: [], optionalProducts: [] };

    order = {
      id: lease.order.id || '',
      price: lease.order.price,
      totalPrice: lease.order.totalPrice,
      ...products,
    };
  }

  return {
    id: lease.id,
    berthComment: lease.berth?.comment ?? '',
    berthDepth: lease.berth?.depth ?? null,
    berthIsAccessible: lease.berth?.isAccessible ?? false,
    berthLength: lease.berth?.length ?? null,
    berthMooringType: lease.berth?.mooringType ?? null,
    berthNum: lease.berth?.number.toString(10) ?? '',
    berthWidth: lease.berth?.width ?? null,
    electricity: lease.berth?.pier.properties?.electricity ?? false,
    gate: lease.berth?.pier.properties?.gate ?? false,
    harborName: lease.berth?.pier.properties?.harbor.properties?.name ?? '',
    lighting: lease.berth?.pier.properties?.lighting ?? false,
    pierIdentifier: lease.berth?.pier.properties?.identifier ?? '',
    wasteCollection: lease.berth?.pier.properties?.wasteCollection ?? false,
    water: lease.berth?.pier.properties?.water ?? false,
    order,
  };
};
