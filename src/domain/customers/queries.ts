import { gql } from 'apollo-boost';

export const CUSTOMER_QUERY = gql`
  query CUSTOMERS {
    profiles(serviceType: BERTH) {
      edges {
        node {
          id
          firstName
          lastName
          nickname
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
