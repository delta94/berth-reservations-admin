import { gql } from 'apollo-boost';

export const INDIVIDUAL_HARBOR_QUERY = gql`
  query INDIVIDUAL_HARBOR($id: ID!) {
    harbor(id: $id) {
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
              id
              properties {
                identifier
                electricity
                wasteCollection
                water
                lighting
                gate
                suitableBoatTypes {
                  name
                }
                berths {
                  edges {
                    node {
                      id
                      number
                      width
                      length
                      mooringType
                    }
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
