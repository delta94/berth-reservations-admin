import { gql } from 'apollo-boost';

export const HARBOR_FORM_QUERY = gql`
  query HARBOR_FORM($id: ID!) {
    harbor(id: $id) {
      id
      properties {
        name
        streetAddress
        zipCode
        municipality
        wwwUrl
        imageFile
        maps {
          id
          url
        }
      }
    }
  }
`;
