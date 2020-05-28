import { gql } from 'apollo-boost';

export const CUSTOMERS_QUERY = gql`
  query CUSTOMERS(
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
          nickname
          comment
          organization {
            businessId
            organizationType
          }
          primaryAddress {
            address
            city
            postalCode
          }
          primaryPhone {
            phone
          }
          primaryEmail {
            email
          }
          serviceConnections {
            edges {
              node {
                id
                service {
                  id
                  type
                }
              }
            }
          }
          contactMethod
          image
          boats {
            edges {
              node {
                name
              }
            }
          }
          berthApplications {
            edges {
              node {
                createdAt
              }
            }
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
        }
      }
    }
  }
`;
