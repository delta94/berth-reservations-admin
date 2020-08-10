import gql from 'graphql-tag';

export const UPDATE_WINTER_STORAGE_PRICE_MUTATION = gql`
  mutation UPDATE_WINTER_STORAGE_PRICE($input: UpdateWinterStorageProductMutationInput!) {
    updateWinterStorageProduct(input: $input) {
      winterStorageProduct {
        id
        priceValue
        priceUnit
        taxPercentage
      }
    }
  }
`;

export const CREATE_WINTER_STORAGE_PRODUCT_MUTATION = gql`
  mutation CREATE_WINTER_STORAGE_PRODUCT($input: CreateWinterStorageProductMutationInput!) {
    createWinterStorageProduct(input: $input) {
      winterStorageProduct {
        id
        priceValue
        priceUnit
        taxPercentage
      }
    }
  }
`;
