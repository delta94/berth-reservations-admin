import { gql } from 'apollo-boost';

export const FILTERED_CUSTOMERS_QUERY = gql`
  query FILTERED_CUSTOMERS(
    $firstName: String
    $lastName: String
    $email: String
    $address: String
  ) {
    profiles(
      serviceType: BERTH
      firstName: $firstName
      lastName: $lastName
      emails_Email: $email
      addresses_Address: $address
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
            organizationType
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
        comment
        firstName
        invoicingType
        lastName
        id
        organization {
          address
          businessId
          city
          name
          organizationType
          postalCode
        }
        primaryAddress {
          address
          postalCode
          city
        }
        primaryEmail {
          email
        }
        primaryPhone {
          phone
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
          depth
          length
          mooringType
          width
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
