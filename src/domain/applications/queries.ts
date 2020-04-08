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
            berthNumber
            harbor
            harborName
            pier
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
              number
              pier {
                properties {
                  identifier
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
