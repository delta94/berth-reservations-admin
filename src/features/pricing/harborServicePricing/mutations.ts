import gql from 'graphql-tag';

export const UPDATE_HARBOR_SERVICE_PRICE_MUTATION = gql`
  mutation UPDATE_HARBOR_SERVICE_PRICE($input: UpdateAdditionalProductMutationInput!) {
    updateAdditionalProduct(input: $input) {
      additionalProduct {
        id
        priceValue
        priceUnit
        service
        period
        taxPercentage
        productType
      }
    }
  }
`;
