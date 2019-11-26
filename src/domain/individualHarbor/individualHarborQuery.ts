import { gql } from 'apollo-boost';

export const INDIVIDUAL_HARBOR_QUERY = gql`
  query INDIVIDUAL_HARBOR($id: ID!) {
    harbor(id: $id) {
      id
      properties {
        name
        numberOfPlaces
        streetAddress
        zipCode
        municipality
        wwwUrl
        imageFile
        servicemapId
        piers {
          edges {
            node {
              properties {
                electricity
                wasteCollection
                gate
                water
                lighting
              }
            }
          }
        }
      }
    }
  }
`;
