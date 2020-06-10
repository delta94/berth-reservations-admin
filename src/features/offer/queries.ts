import gql from 'graphql-tag';

export const OFFER_PAGE_QUERY = gql`
  query OFFER_PAGE($applicationId: ID!, $servicemapId: String!) {
    berthApplication(id: $applicationId) {
      id
      createdAt
      status
      berthSwitch {
        id
      }
      customer {
        id
      }
      boatType
      boatRegistrationNumber
      boatName
      boatModel
      boatWidth
      boatLength
      boatDraught
      boatWeight
    }
    boatTypes {
      id
      name
    }
    harborByServicemapId(servicemapId: $servicemapId) {
      id
      properties {
        name
        servicemapId
        imageFile
        maps {
          id
          url
        }
        streetAddress
        municipality
        zipCode
        maxWidth
        numberOfPlaces
        numberOfFreePlaces
        piers(forApplication: $applicationId) {
          edges {
            node {
              id
              properties {
                identifier
                electricity
                gate
                water
                lighting
                wasteCollection
                berths {
                  edges {
                    node {
                      id
                      number
                      width
                      length
                      depth
                      mooringType
                      comment
                      isAccessible
                      leases {
                        edges {
                          node {
                            status
                            startDate
                            endDate
                            isActive
                            customer {
                              id
                              firstName
                              lastName
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
  }
`;
