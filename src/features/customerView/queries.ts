import gql from 'graphql-tag';

export const INDIVIDUAL_CUSTOMER_QUERY = gql`
  query INDIVIDUAL_CUSTOMER($id: ID!) {
    profile(id: $id, serviceType: BERTH) {
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
      boats {
        edges {
          node {
            id
            boatType {
              id
              name
            }
            width
            length
            draught
            weight
            name
            model
            registrationNumber
            propulsion
            hullMaterial
            intendedUse
            certificates {
              file
              certificateType
              validUntil
              checkedAt
              checkedBy
            }
          }
        }
      }
      berthLeases {
        edges {
          node {
            id
            status
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
      orders {
        edges {
          node {
            dueDate
            totalPrice
            totalTaxPercentage
            price
            taxPercentage
            status
            orderLines {
              edges {
                node {
                  product {
                    service
                  }
                  price
                  taxPercentage
                }
              }
            }
            lease {
              ... on BerthLeaseNode {
                startDate
                endDate
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
              ... on WinterStorageLeaseNode {
                startDate
                endDate
              }
            }
          }
        }
      }
      berthApplications {
        edges {
          node {
            id
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
            status
            lease {
              id
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
            boatType
            boatRegistrationNumber
            boatWidth
            boatLength
            boatDraught
            boatWeight
            boatName
            boatModel
            harborChoices {
              harbor
              priority
              harborName
            }
            accessibilityRequired
          }
        }
      }
    }
    boatTypes {
      id
      name
    }
  }
`;
