import gql from 'graphql-tag';

export const WINTER_STORAGE_AREA_QUERY = gql`
  query WINTER_STORAGE_AREAS {
    winterStorageAreas {
      edges {
        node {
          id
          properties {
            name
          }
        }
      }
    }
  }
`;
