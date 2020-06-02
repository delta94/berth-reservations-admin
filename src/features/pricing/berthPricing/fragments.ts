import { gql } from 'apollo-boost';

export const BERTHS_PRICING_FRAGMENT = gql`
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
