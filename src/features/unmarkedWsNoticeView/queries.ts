import gql from 'graphql-tag';

export const UNMARKED_WINTER_STORAGE_NOTICE_QUERY = gql`
  query UNMARKED_WINTER_STORAGE_NOTICE($id: ID!) {
    winterStorageApplication(id: $id) {
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
        customerGroup
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
      createdAt
      municipality
      boatType
      boatRegistrationNumber
      boatWidth
      boatLength
      boatName
      boatModel
      acceptBoatingNewsletter
      acceptFitnessNews
      acceptLibraryNews
      acceptOtherCultureNews
      status
      winterStorageAreaChoices {
        winterStorageArea
        priority
        winterStorageAreaName
      }
      applicationCode
    }
    boatTypes {
      id
      name
    }
  }
`;
