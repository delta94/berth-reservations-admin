import gql from 'graphql-tag';

export const UNMARKED_WINTER_STORAGE_APPLICATIONS_QUERY = gql`
  query UNMARKED_WINTER_STORAGE_APPLICATIONS($first: Int!, $after: String, $orderBy: String) {
    winterStorageApplications(first: $first, after: $after, orderBy: $orderBy) {
      count
      edges {
        node {
          id
          status
          createdAt
          municipality
          customer {
            id
          }
          boatType
          boatRegistrationNumber
          boatWidth
          boatLength
          boatName
          boatModel
          winterStorageAreaChoices {
            priority
            winterStorageAreaName
            winterStorageArea
          }
        }
      }
    }
    boatTypes {
      id
      name
    }
  }
`;
