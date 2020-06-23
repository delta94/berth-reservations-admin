import gql from 'graphql-tag';

export const WINTER_STORAGE_AREA_QUERY = gql`
  query WINTER_STORAGE_AREAS {
    winterStorageAreas {
      edges {
        node {
          id
          properties {
            maxWidth
            municipality
            name
            streetAddress
            wwwUrl
            zipCode
            sections {
              edges {
                node {
                  id
                  properties {
                    electricity
                    gate
                    summerStorageForDockingEquipment
                    summerStorageForTrailers
                    water
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
