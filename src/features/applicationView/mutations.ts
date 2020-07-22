import gql from 'graphql-tag';

export const UPDATE_BERTH_APPLICATION_MUTATION = gql`
  mutation UPDATE_BERTH_APPLICATION($input: UpdateBerthApplicationInput!) {
    updateBerthApplication(input: $input) {
      berthApplication {
        id
        customer {
          id
        }
      }
    }
  }
`;
