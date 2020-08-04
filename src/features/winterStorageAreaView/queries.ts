import gql from 'graphql-tag';

export const INDIVIDUAL_WINTER_STORAGE_AREA_QUERY = gql`
  query INDIVIDUAL_WINTER_STORAGE_AREA($id: ID!) {
    winterStorageArea(id: $id) {
      properties {
        name
        zipCode
        municipality
        streetAddress
        wwwUrl
        imageFile
        maps {
          id
          url
        }
        sections {
          edges {
            node {
              properties {
                electricity
                water
                gate
                summerStorageForBoats
                summerStorageForTrailers
                summerStorageForDockingEquipment
              }
            }
          }
        }
      }
    }
  }
`;
