import gql from 'graphql-tag';

export const ADDITIONAL_SERVICE_PRICING_FRAGMENT = gql`
  fragment AdditionalServicePricing on AdditionalProductNodeConnection {
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
