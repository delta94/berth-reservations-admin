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
    }
  }
`;
