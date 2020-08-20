import gql from 'graphql-tag';

export const CREATE_NEW_PROFILE_MUTATION = gql`
  mutation CREATE_NEW_PROFILE(
    $firstName: String!
    $lastName: String!
    $address: String!
    $postalCode: String!
    $city: String!
    $email: String!
    $phone: String!
  ) {
    createProfile(
      input: {
        serviceType: BERTH
        profile: {
          firstName: $firstName
          lastName: $lastName
          addAddresses: { address: $address, postalCode: $postalCode, city: $city, primary: true, addressType: NONE }
          addEmails: { email: $email, emailType: NONE, primary: true }
          addPhones: { phone: $phone, phoneType: NONE, primary: true }
        }
      }
    ) {
      profile {
        id
        lastName
        firstName
        primaryAddress {
          address
          city
        }
      }
    }
  }
`;
