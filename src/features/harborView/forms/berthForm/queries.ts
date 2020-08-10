import gql from 'graphql-tag';

export const INDIVIDUAL_BERTH_QUERY = gql`
  query INDIVIDUAL_BERTH($id: ID!) {
    berth(id: $id) {
      number
      comment
      isActive
      pier {
        id
        properties {
          identifier
        }
      }
      mooringType
      width
      length
      depth
    }
  }
`;
