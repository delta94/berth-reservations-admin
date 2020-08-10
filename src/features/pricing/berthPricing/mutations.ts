import gql from 'graphql-tag';

export const UPDATE_BERTH_PRICE_MUTATION = gql`
  mutation UPDATE_BERTH_PRICE($input: UpdateBerthProductMutationInput!) {
    updateBerthProduct(input: $input) {
      berthProduct {
        id
        priceValue
        priceUnit
      }
    }
  }
`;

export const CREATE_BERTH_PRODUCT_MUTATION = gql`
  mutation CREATE_BERTH_PRODUCT($input: CreateBerthProductMutationInput!) {
    createBerthProduct(input: $input) {
      berthProduct {
        id
        priceValue
        priceUnit
      }
    }
  }
`;
