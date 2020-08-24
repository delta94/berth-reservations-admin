import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { getOperationName } from 'apollo-link';

import { BERTH_APPLICATIONS_QUERY } from '../../features/applicationList/queries';
import {
  DELETE_DRAFTED_APPLICATION,
  DELETE_DRAFTED_APPLICATIONVariables as DELETE_DRAFTED_APPLICATION_VARS,
} from './__generated__/DELETE_DRAFTED_APPLICATION';
import { WINTER_STORAGE_APPLICATIONS_QUERY } from '../../features/winterStorageApplicationList/queries';
import {
  DELETE_DRAFTER_WINTER_STORAGE_APPLICATION,
  DELETE_DRAFTER_WINTER_STORAGE_APPLICATIONVariables as DELETE_DRAFTER_WINTER_STORAGE_APPLICATION_VARS,
} from './__generated__/DELETE_DRAFTER_WINTER_STORAGE_APPLICATION';

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
    refetchQueries: [getOperationName(BERTH_APPLICATIONS_QUERY) || 'BERTH_APPLICATIONS'],
  });

export const DELETE_DRAFTER_WINTER_STORAGE_APPLICATION_MUTATION = gql`
  mutation DELETE_DRAFTER_WINTER_STORAGE_APPLICATION($input: DeleteWinterStorageLeaseMutationInput!) {
    deleteWinterStorageLease(input: $input) {
      __typename
      clientMutationId
    }
  }
`;

export const useDeleteWinterStorageApplication = () =>
  useMutation<DELETE_DRAFTER_WINTER_STORAGE_APPLICATION, DELETE_DRAFTER_WINTER_STORAGE_APPLICATION_VARS>(
    DELETE_DRAFTER_WINTER_STORAGE_APPLICATION_MUTATION,
    {
      refetchQueries: [getOperationName(WINTER_STORAGE_APPLICATIONS_QUERY) || 'WINTER_STORAGE_APPLICATIONS'],
    }
  );
