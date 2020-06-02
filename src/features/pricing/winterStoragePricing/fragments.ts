import { gql } from 'apollo-boost';

export const WINTER_STORAGE_PRICING = gql`
  fragment WinterStoragePricing on WinterStorageAreaNodeConnection {
    edges {
      node {
        id
        properties {
          name
          product {
            priceValue
            priceUnit
          }
        }
      }
    }
  }
`;
