import { gql } from 'apollo-boost';

export const CREATE_PIER_MUTATION = gql`
  mutation CREATE_PIER($input: CreatePierMutationInput!) {
    createPier(input: $input) {
      clientMutationId
    }
  }
`;
