import gql from 'graphql-tag';

export const UPDATE_CUSTOMER_BOAT_MUTATION = gql`
  mutation UPDATE_CUSTOMER_BOAT($input: UpdateBoatMutationInput!) {
    updateBoat(input: $input) {
      clientMutationId
    }
  }
`;

export const CREATE_CUSTOMER_BOAT_MUTATION = gql`
  mutation CREATE_CUSTOMER_BOAT($input: CreateBoatMutationInput!) {
    createBoat(input: $input) {
      clientMutationId
    }
  }
`;

export const DELETE_CUSTOMER_BOAT_MUTATION = gql`
  mutation DELETE_CUSTOMER_BOAT($input: DeleteBoatMutationInput!) {
    deleteBoat(input: $input) {
      clientMutationId
    }
  }
`;
