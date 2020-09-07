import gql from 'graphql-tag';

export const INDIVIDUAL_WINTER_STORAGE_AREA_QUERY = gql`
  query INDIVIDUAL_WINTER_STORAGE_AREA($id: ID!) {
    winterStorageArea(id: $id) {
      properties {
        name
        zipCode
        municipality
        streetAddress
        wwwUrl
        imageFile
        maps {
          id
          url
        }
        sections {
          edges {
            node {
              id
              properties {
                identifier
                electricity
                water
                gate
                summerStorageForBoats
                summerStorageForTrailers
                summerStorageForDockingEquipment
                leases {
                  edges {
                    node {
                      id
                      startDate
                      endDate
                      status
                      isActive
                      application {
                        id
                        createdAt
                        customer {
                          id
                          firstName
                          lastName
                        }
                      }
                    }
                  }
                }
                places {
                  edges {
                    node {
                      id
                      number
                      width
                      length
                      isActive
                      leases {
                        edges {
                          node {
                            id
                            startDate
                            endDate
                            status
                            isActive
                            application {
                              id
                              createdAt
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
  }
`;
