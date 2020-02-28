import { gql } from 'apollo-boost';

export const BERTH_APPLICATIONS_QUERY = gql`
  query BERTH_APPLICATIONS {
    berthApplications {
      edges {
        node {
          id
          customer {
            id
          }
          berthSwitch {
            id
          }
          createdAt
          municipality
          boatType
          boatRegistrationNumber
          boatWidth
          boatLength
          boatDraught
          boatWeight
          boatName
          boatModel
          accessibilityRequired
          status
          lease {
            id
            berth {
              pier {
                properties {
                  harbor {
                    id
                    properties {
                      name
                    }
                  }
                }
              }
            }
          }
          harborChoices {
            harbor
            priority
            harborName
          }
        }
      }
    }
    boatTypes {
      id
      name
    }
  }
`;
