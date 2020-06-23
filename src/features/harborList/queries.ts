import gql from 'graphql-tag';

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
            maps {
              id
              url
            }
            servicemapId
            maxWidth
            piers {
              edges {
                node {
                  id
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
