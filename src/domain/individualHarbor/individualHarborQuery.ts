import { gql } from 'apollo-boost';

export const INDIVIDUAL_HARBOR_QUERY = gql`
  query INDIVIDUAL_HARBOR($id: ID!) {
    __type(name: "BerthMooringType") {
      enumValues {
        name
        description
      }
    }
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
                identifier
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
