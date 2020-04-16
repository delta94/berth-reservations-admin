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
              properties {
                identifier
                electricity
                wasteCollection
                water
                lighting
                gate
                berths {
                  edges {
                    node {
                      number
                      berthType {
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
  }
`;
