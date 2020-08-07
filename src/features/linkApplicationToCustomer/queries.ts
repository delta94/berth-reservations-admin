import gql from 'graphql-tag';

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
          customerGroup
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
