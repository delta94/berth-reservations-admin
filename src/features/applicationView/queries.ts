import gql from 'graphql-tag';

import { BERTH_LEASE_FRAGMENT, ADDITIONAL_SERVICES_FRAGMENT } from './offerCard/fragments';

export const FILTERED_CUSTOMERS_QUERY = gql`
  query FILTERED_CUSTOMERS(
    $first: Int!
    $after: String
    $firstName: String
    $lastName: String
    $email: String
    $address: String
    $orderBy: String
  ) {
    profiles(
      first: $first
      after: $after
      serviceType: BERTH
      firstName: $firstName
      lastName: $lastName
      emails_Email: $email
      addresses_Address: $address
      orderBy: $orderBy
    ) {
      count
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
      businessId
      companyName
      language
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
        language
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
      harborChoices {
        harbor
        priority
        harborName
      }
      ...BerthLease
    }
    boatTypes {
      id
      name
    }
    ...AdditionalServices
  }
  ${BERTH_LEASE_FRAGMENT}
  ${ADDITIONAL_SERVICES_FRAGMENT}
`;
