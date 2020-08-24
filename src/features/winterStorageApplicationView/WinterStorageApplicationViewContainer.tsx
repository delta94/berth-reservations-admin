import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useParams } from 'react-router-dom';

import WinterStorageApplicationView from './WinterStorageApplicationView';
import LoadingSpinner from '../../common/spinner/LoadingSpinner';
import { INDIVIDUAL_WINTER_STORAGE_APPLICATION_QUERY } from './queries';
import { useDeleteWinterStorageApplication } from '../../common/mutations/deleteBerthApplication';
import { UPDATE_WINTER_STORAGE_APPLICATION_MUTATION } from './mutations';
import {
  UPDATE_WINTER_STORAGE_APPLICATION,
  UPDATE_WINTER_STORAGE_APPLICATIONVariables as UPDATE_WINTER_STORAGE_APPLICATION_VARS,
} from './__generated__/UPDATE_WINTER_STORAGE_APPLICATION';
import { getWinterStorageApplicationDetailsData } from './utils';
import {
  INDIVIDUAL_WINTER_STORAGE_APPLICATION,
  INDIVIDUAL_WINTER_STORAGE_APPLICATIONVariables as INDIVIDUAL_WINTER_STORAGE_APPLICATION_VARS,
} from './__generated__/INDIVIDUAL_WINTER_STORAGE_APPLICATION';
import { getCustomerProfile } from '../customerView/utils';

const WinterStorageApplicationViewContainer = () => {
  const { id } = useParams<{ id: string }>();

  const { loading, data } = useQuery<INDIVIDUAL_WINTER_STORAGE_APPLICATION, INDIVIDUAL_WINTER_STORAGE_APPLICATION_VARS>(
    INDIVIDUAL_WINTER_STORAGE_APPLICATION_QUERY,
    {
      variables: {
        id,
      },
    }
  );

  const [deleteDraftedApplication] = useDeleteWinterStorageApplication();
  const handleDeleteLease = (id: string) => {
    deleteDraftedApplication({
      variables: {
        input: {
          id,
        },
      },
    });
  };

  const [linkCustomer] = useMutation<UPDATE_WINTER_STORAGE_APPLICATION, UPDATE_WINTER_STORAGE_APPLICATION_VARS>(
    UPDATE_WINTER_STORAGE_APPLICATION_MUTATION,
    {
      refetchQueries: [
        {
          query: INDIVIDUAL_WINTER_STORAGE_APPLICATION_QUERY,
          variables: {
            id,
          },
        },
      ],
    }
  );

  const handleLinkCustomer = (customerId: string) => {
    linkCustomer({
      variables: {
        input: { id, customerId },
      },
    });
  };

  if (loading || !data?.winterStorageApplication) return <LoadingSpinner isLoading={true} />;

  const customer = data?.winterStorageApplication?.customer;
  const customerProfile = customer ? getCustomerProfile(customer) : null;

  const applicationDetails = getWinterStorageApplicationDetailsData(
    data.winterStorageApplication,
    data.boatTypes || []
  );

  return (
    <WinterStorageApplicationView
      customerProfile={customerProfile}
      applicationDetails={applicationDetails}
      winterStorageApplication={data.winterStorageApplication}
      handleDeleteLease={handleDeleteLease}
      handleLinkCustomer={handleLinkCustomer}
    />
  );
};

export default WinterStorageApplicationViewContainer;
