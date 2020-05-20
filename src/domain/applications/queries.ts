import { gql } from 'apollo-boost';

export const BERTH_APPLICATIONS_QUERY = gql`
  # Note:
  # The operation name "BERTH_APPLICATIONS" is used as a string in other modules,
  # for instance, as a value of refetchQueries; If you modify this name, consider changing it in other places too.
  query BERTH_APPLICATIONS($first: Int!, $after: String, $switchApplications: Boolean) {
    berthApplications(first: $first, after: $after, switchApplications: $switchApplications) {
      count
      edges {
        node {
          id
          customer {
            id
          }
          berthSwitch {
            berthNumber
            harbor
            harborName
            id
            pier
            reason {
              title
            }
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
