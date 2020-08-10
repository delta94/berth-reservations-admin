import gql from 'graphql-tag';

export const CREATE_ORDER_LINE_MUTATION = gql`
  mutation CREATE_ORDER_LINE($input: CreateOrderLineMutationInput!) {
    createOrderLine(input: $input) {
      order {
        id
        price
        totalPrice
        orderLines {
          edges {
            node {
              id
              price
              product {
                id
                service
                productType
              }
            }
          }
        }
      }
    }
  }
`;

export const DELETE_ORDER_LINE_MUTATION = gql`
  mutation DELETE_ORDER_LINE($input: DeleteOrderLineMutationInput!) {
    deleteOrderLine(input: $input) {
      clientMutationId
    }
  }
`;
