import { gql } from 'apollo-boost';

export const OFFER_PAGE_QUERY = gql`
  query OFFER_PAGE($applicationId: ID!, $servicemapId: String!) {
    berthApplication(id: $applicationId) {
      id
      createdAt
      status
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
                berths {
                  edges {
                    node {
                      id
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
