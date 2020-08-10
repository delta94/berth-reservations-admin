import gql from 'graphql-tag';

export const WINTER_STORAGE_AREAS_QUERY = gql`
  query WINTER_STORAGE_AREAS {
    winterStorageAreas {
      edges {
        node {
          id
          properties {
            imageFile
            maps {
              id
              url
            }
            maxWidth
            municipality
            name
            numberOfFreePlaces
            numberOfPlaces
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
            streetAddress
            wwwUrl
            zipCode
          }
        }
      }
    }
  }
`;
