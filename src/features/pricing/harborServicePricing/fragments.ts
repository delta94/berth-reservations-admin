import gql from 'graphql-tag';

export const HARBOR_SERVICE_PRICING_FRAGMENT = gql`
  fragment HarborServicePricing on AdditionalProductNodeConnection {
    edges {
      node {
        id
        service
        priceValue
        priceUnit
        period
        productType
        taxPercentage
      }
    }
  }
`;
