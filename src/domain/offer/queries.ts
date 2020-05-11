import { gql } from 'apollo-boost';

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
    }
    harborByServicemapId(servicemapId: $servicemapId) {
      id
      properties {
        name
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
