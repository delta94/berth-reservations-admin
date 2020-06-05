import { gql } from 'apollo-boost';

import { BERTH_PRICING_FRAGMENT } from './berthPricing/fragments';
import { WINTER_STORAGE_PRICING_FRAGMENT } from './winterStoragePricing/fragments';
import { HARBOR_SERVICE_PRICING_FRAGMENT } from './harborServicePricing/fragments';
import { ADDITIONAL_SERVICE_PRICING_FRAGMENT } from './additionalServicePricing/fragments';

export const PRICING_PAGE_QUERY = gql`
  query PRICING_PAGE {
    berthPriceGroups {
      ...BerthPricing
    }
    winterStorageAreas {
      ...WinterStoragePricing
    }
    additionalProducts(productType: FIXED_SERVICE) {
      ...HarborServicePricing
    }
    optionalProducts: additionalProducts(productType: OPTIONAL_SERVICE) {
      ...AdditionalServicePricing
    }
  }
  ${BERTH_PRICING_FRAGMENT}
  ${WINTER_STORAGE_PRICING_FRAGMENT}
  ${HARBOR_SERVICE_PRICING_FRAGMENT}
  ${ADDITIONAL_SERVICE_PRICING_FRAGMENT}
`;
