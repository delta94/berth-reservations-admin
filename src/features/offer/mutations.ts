import gql from 'graphql-tag';

export const CREATE_LEASE_MUTATION = gql`
  mutation CREATE_LEASE($input: CreateBerthLeaseMutationInput!) {
    createBerthLease(input: $input) {
      berthLease {
        id
        status
      }
    }
  }
`;
