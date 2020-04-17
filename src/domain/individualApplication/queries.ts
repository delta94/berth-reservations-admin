import { gql } from 'apollo-boost';

export const FILTERED_CUSTOMERS_QUERY = gql`
  query FILTERED_CUSTOMERS($firstName: String, $lastName: String) {
    profiles(
      serviceType: BERTH
      firstName: $firstName
      lastName: $lastName
      orderBy: "lastName"
    ) {
      edges {
        node {
          id
          firstName
          lastName
          primaryAddress {
            address
            postalCode
            city
          }
          organization {
            businessId
          }
          berthLeases {
            edges {
              node {
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
                berthSwitch {
                  harborName
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const INDIVIDUAL_APPLICATION_QUERY = gql`
  query INDIVIDUAL_APPLICATION($id: ID!) {
    berthApplication(id: $id) {
      id
      firstName
      lastName
      address
      municipality
      zipCode
      phoneNumber
      email

      customer {
        id
        organization {
          businessId
        }
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
          berthType {
            depth
            length
            mooringType
            width
          }
          comment
          isAccessible
          number
          pier {
            properties {
              identifier
              electricity
              gate
              lighting
              mooring
              wasteCollection
              water
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
    boatTypes {
      id
      name
    }
  }
`;
