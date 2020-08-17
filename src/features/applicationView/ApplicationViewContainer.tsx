import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useParams } from 'react-router-dom';
import { getOperationName } from 'apollo-link';

import ApplicationView from './ApplicationView';
import LoadingSpinner from '../../common/spinner/LoadingSpinner';
import { INDIVIDUAL_APPLICATION_QUERY } from './queries';
import {
  INDIVIDUAL_APPLICATION,
  INDIVIDUAL_APPLICATIONVariables as INDIVIDUAL_APPLICATION_VARS,
} from './__generated__/INDIVIDUAL_APPLICATION';
import { useDeleteBerthApplication } from '../../common/mutations/deleteBerthApplication';
import { getApplicationDetailsData } from './utils';
import { getOfferDetailsData } from './offerCard/utils';
import { getCustomerProfile } from '../customerView/utils';

const ApplicationViewContainer = () => {
  const { id } = useParams<{ id: string }>();

  const { loading, data } = useQuery<INDIVIDUAL_APPLICATION, INDIVIDUAL_APPLICATION_VARS>(
    INDIVIDUAL_APPLICATION_QUERY,
    {
      variables: {
        id,
      },
    }
  );

  const [deleteDraftedApplication] = useDeleteBerthApplication();

  const customer = data?.berthApplication?.customer;

  if (loading || !data?.berthApplication) return <LoadingSpinner isLoading={true} />;

  const customerProfile = customer ? getCustomerProfile(customer) : null;
  const applicationDetails = getApplicationDetailsData(data.berthApplication, data.boatTypes || []);
  const leaseDetails = getOfferDetailsData(data.berthApplication.lease);

  const handleDeleteLease = (id: string) => {
    deleteDraftedApplication({
      variables: {
        input: {
          id,
        },
      },
      refetchQueries: [getOperationName(INDIVIDUAL_APPLICATION_QUERY) || 'INDIVIDUAL_APPLICATION'],
    });
  };

  return (
    <ApplicationView
      applicationDetails={applicationDetails}
      berthApplication={data.berthApplication}
      customerProfile={customerProfile}
      handleDeleteLease={handleDeleteLease}
      leaseDetails={leaseDetails}
      refetchQueries={[getOperationName(INDIVIDUAL_APPLICATION_QUERY) || 'INDIVIDUAL_APPLICATION']}
    />
  );
};

export default ApplicationViewContainer;
