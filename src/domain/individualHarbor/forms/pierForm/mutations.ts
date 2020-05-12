import { gql } from 'apollo-boost';

export const CREATE_PIER_MUTATION = gql`
  mutation CREATE_PIER($input: CreatePierMutationInput!) {
    createPier(input: $input) {
      clientMutationId
    }
  }
`;

export const UPDATE_PIER_MUTATION = gql`
  mutation UPDATE_PIER($input: UpdatePierMutationInput!) {
    updatePier(input: $input) {
      clientMutationId
    }
  }
`;

export const DELETE_PIER_MUTATION = gql`
  mutation DELETE_PIER($input: DeletePierMutationInput!) {
    deletePier(input: $input) {
      clientMutationId
    }
  }
`;
