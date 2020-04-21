import { gql } from 'apollo-boost';

export const HARBORS_QUERY = gql`
  query HARBORS {
    harbors {
      edges {
        node {
          id
          properties {
            name
            numberOfPlaces
            numberOfFreePlaces
            streetAddress
            zipCode
            municipality
            wwwUrl
            imageFile
            servicemapId
            maxWidth
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
    }
  }
`;
