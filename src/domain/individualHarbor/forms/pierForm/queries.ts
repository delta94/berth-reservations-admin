import { gql } from 'apollo-boost';

export const BOAT_TYPES_QUERY = gql`
  query BOAT_TYPES {
    boatTypes {
      id
      name
    }
  }
`;
