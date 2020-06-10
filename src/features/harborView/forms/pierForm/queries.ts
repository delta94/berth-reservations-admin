import gql from 'graphql-tag';

export const BOAT_TYPES_QUERY = gql`
  query BOAT_TYPES {
    boatTypes {
      id
      name
    }
  }
`;

export const PIER_AND_BOAT_TYPES_QUERY = gql`
  query PIER_AND_BOAT_TYPES($id: ID!) {
    pier(id: $id) {
      properties {
        identifier
        suitableBoatTypes {
          id
        }
        mooring
        lighting
        electricity
        gate
        wasteCollection
        water
        personalElectricity
      }
    }
    boatTypes {
      id
      name
    }
  }
`;
