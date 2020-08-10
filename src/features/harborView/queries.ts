import gql from 'graphql-tag';

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
                      isActive
                      number
                      width
                      length
                      depth
                      mooringType
                      comment
                      leases {
                        edges {
                          node {
                            customer {
                              id
                              firstName
                              lastName
                            }
                            status
                            startDate
                            endDate
                            isActive
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
    }
  }
`;
