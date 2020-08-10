import gql from 'graphql-tag';

export const WINTER_STORAGE_PRICING_FRAGMENT = gql`
  fragment WinterStoragePricing on WinterStorageAreaNodeConnection {
    edges {
      node {
        id
        properties {
          name
          product {
            id
            priceValue
            priceUnit
          }
        }
      }
    }
  }
`;
