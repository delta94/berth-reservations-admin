import { gql } from 'apollo-boost';

export const INDIVIDUAL_CUSTOMER_QUERY = gql`
  query INDIVIDUAL_CUSTOMER($id: ID!) {
    profile(id: $id, serviceType: BERTH) {
      id
      firstName
      lastName
      primaryEmail {
        email
      }
      primaryPhone {
        phone
      }
      primaryAddress {
        address
        postalCode
        city
      }
      invoicingType
      comment
      boats {
        edges {
          node {
            id
            boatType {
              id
              name
            }
            width
            length
            draught
            weight
            name
            model
            registrationNumber
            propulsion
            hullMaterial
          }
        }
      }
      berthLeases {
        edges {
          node {
            id
            status
            startDate
            endDate
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
        }
      }
      berthApplications {
        edges {
          node {
            id
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
            boatType
            boatRegistrationNumber
            boatWidth
            boatLength
            boatDraught
            boatWeight
            boatName
            boatModel
            harborChoices {
              harbor
              priority
              harborName
            }
            accessibilityRequired
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
