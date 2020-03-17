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
      berthLeases {
        edges {
          node {
            id
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
    }
  }
`;
