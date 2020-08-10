import gql from 'graphql-tag';

export const UPDATE_BERTH_MUTATION = gql`
  mutation UPDATE_BERTH($input: UpdateBerthMutationInput!) {
    updateBerth(input: $input) {
      clientMutationId
    }
  }
`;

export const DELETE_BERTH_MUTATION = gql`
  mutation DELETE_BERTH($input: DeleteBerthMutationInput!) {
    deleteBerth(input: $input) {
      clientMutationId
    }
  }
`;

export const CREATE_BERTH_MUTATION = gql`
  mutation CREATE_BERTH($input: CreateBerthMutationInput!) {
    createBerth(input: $input) {
      clientMutationId
    }
  }
`;
