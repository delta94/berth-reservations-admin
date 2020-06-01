import { gql } from 'apollo-boost';

export const UPDATE_HARBOR_MUTATION = gql`
  mutation UPDATE_HARBOR($input: UpdateHarborMutationInput!) {
    updateHarbor(input: $input) {
      clientMutationId
    }
  }
`;
