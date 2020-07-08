import gql from 'graphql-tag';

export const ORDER_OPTIONAL_PRODUCTS_QUERY = gql`
  query ORDER_OPTIONAL_PRODUCTS {
    additionalProducts(productType: OPTIONAL_SERVICE) {
      edges {
        node {
          id
          service
          priceValue
          priceUnit
          period
          productType
        }
      }
    }
  }
`;
