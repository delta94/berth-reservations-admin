import { gql } from 'apollo-boost';

export const BERTH_APPLICATIONS_QUERY = gql`
  query BERTH_APPLICATIONS {
    berthApplications {
      edges {
        node {
          id
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
          harborChoices {
            harbor
            priority
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
