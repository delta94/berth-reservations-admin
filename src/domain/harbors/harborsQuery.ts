import { gql } from 'apollo-boost';

export const HARBORS_QUERY = gql`
  query HARBORS {
    harbors {
      edges {
        node {
          id
          properties {
            municipality
            imageFile
            numberOfPlaces
            name
            streetAddress
          }
        }
      }
    }
  }
`;
