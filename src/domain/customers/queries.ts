import { gql } from 'apollo-boost';

export const CUSTOMER_QUERY = gql`
  query CUSTOMERS($after: String, $first: Int!) {
    profiles(serviceType: BERTH, first: $first, after: $after) {
      count
      edges {
        node {
          id
          firstName
          lastName
          nickname
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
        }
      }
    }
  }
`;
