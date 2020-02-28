import { gql } from 'apollo-boost';

export const DELETE_DRAFTED_APPLICATION_MUTATION = gql`
  mutation DELETE_DRAFTED_APPLICATION($input: DeleteBerthLeaseMutationInput!) {
    deleteBerthLease(input: $input) {
      __typename
      clientMutationId
    }
  }
`;
