import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

import {
  DELETE_DRAFTED_APPLICATION,
  DELETE_DRAFTED_APPLICATIONVariables as DELETE_DRAFTED_APPLICATION_VARS,
} from './__generated__/DELETE_DRAFTED_APPLICATION';

export const DELETE_DRAFTED_APPLICATION_MUTATION = gql`
  mutation DELETE_DRAFTED_APPLICATION($input: DeleteBerthLeaseMutationInput!) {
    deleteBerthLease(input: $input) {
      __typename
      clientMutationId
    }
  }
`;

export const useDeleteBerthApplication = () =>
  useMutation<DELETE_DRAFTED_APPLICATION, DELETE_DRAFTED_APPLICATION_VARS>(DELETE_DRAFTED_APPLICATION_MUTATION, {
    refetchQueries: ['BERTH_APPLICATIONS'],
  });
