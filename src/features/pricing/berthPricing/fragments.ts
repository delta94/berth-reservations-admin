import { gql } from 'apollo-boost';

export const BERTH_PRICING_FRAGMENT = gql`
  fragment BerthPricing on BerthPriceGroupNodeConnection {
    edges {
      node {
        id
        name
        defaultProduct {
          priceUnit
          priceValue
        }
      }
    }
  }
`;
