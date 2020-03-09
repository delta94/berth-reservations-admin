import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';

import {
  INDIVIDUAL_APPLICATION_QUERY,
  FILTERED_CUSTOMERS_QUERY,
} from './queries';
import {
  INDIVIDUAL_APPLICATION,
  INDIVIDUAL_APPLICATIONVariables as INDIVIDUAL_APPLICATION_VARS,
} from './__generated__/INDIVIDUAL_APPLICATION';
import { useDeleteBerthApplication } from '../mutations/deleteBerthApplication';
import IndividualApplicationPage from './IndividualApplicationPage';
import {
  FILTERED_CUSTOMERS,
  FILTERED_CUSTOMERSVariables as FILTERED_CUSTOMERS_VARS,
} from './__generated__/FILTERED_CUSTOMERS';
import {
  UPDATE_BERTH_APPLICATION_MUTATION,
  CREATE_NEW_PROFILE_MUTATION,
} from './mutations';
import {
  UPDATE_BERTH_APPLICATION,
  UPDATE_BERTH_APPLICATIONVariables as UPDATE_BERTH_APPLICATION_VARS,
} from './__generated__/UPDATE_BERTH_APPLICATION';
import {
  CREATE_NEW_PROFILE,
  CREATE_NEW_PROFILEVariables as CREATE_NEW_PROFILE_VARS,
} from './__generated__/CREATE_NEW_PROFILE';
import {
  getApplicationDetailsData,
  getCustomerInfoData,
  getFilteredCustomersData,
} from './utils';

const IndividualCustomerPageContainer: React.SFC = () => {
  const { id } = useParams<{ id: string }>();

  const { loading, error, data } = useQuery<
    INDIVIDUAL_APPLICATION,
    INDIVIDUAL_APPLICATION_VARS
  >(INDIVIDUAL_APPLICATION_QUERY, {
    variables: {
      id,
    },
  });

  const { data: customersData } = useQuery<
    FILTERED_CUSTOMERS,
    FILTERED_CUSTOMERS_VARS
  >(FILTERED_CUSTOMERS_QUERY, {
    variables: {
      firstName: data?.berthApplication?.firstName,
    },
  });

  const [
    deleteDraftedApplication,
    { loading: isDeleting },
  ] = useDeleteBerthApplication();

  const [
    linkCustomer,
    { data: updatedBerthData, loading: isUpdating },
  ] = useMutation<UPDATE_BERTH_APPLICATION, UPDATE_BERTH_APPLICATION_VARS>(
    UPDATE_BERTH_APPLICATION_MUTATION
  );

  const [
    createNewCustomer,
    { data: mutationData, loading: isSubmitting },
  ] = useMutation<CREATE_NEW_PROFILE, CREATE_NEW_PROFILE_VARS>(
    CREATE_NEW_PROFILE_MUTATION,
    {
      refetchQueries: [
        {
          query: FILTERED_CUSTOMERS_QUERY,
          variables: {
            firstName: data?.berthApplication?.firstName,
          },
        },
      ],
    }
  );

  if (error || !data?.berthApplication) return <div>error</div>;

  const handleDeleteLease = (id: string) => {
    deleteDraftedApplication({
      variables: {
        input: {
          id,
        },
      },
    });
  };

  const customerInfo = getCustomerInfoData(data.berthApplication);

  const applicationDetailsData = getApplicationDetailsData(
    data.berthApplication
  );

  const filteredCustomersData = !data.berthApplication.customer
    ? getFilteredCustomersData(customersData)
    : null;

  const applicationDetails = { ...applicationDetailsData, handleDeleteLease };

  const handleLinkCustomer = (customerId: string) => {
    linkCustomer({
      variables: {
        input: { id, customerId },
      },
    });
  };

  const handleCreateCustomer = () => {
    const { firstName, lastName, primaryAddress } = customerInfo;
    const phone = customerInfo.phone || '';
    const email = customerInfo.email || '';
    const address = primaryAddress?.address || '';
    const postalCode = primaryAddress?.postalCode || '';
    const city = primaryAddress?.city || '';

    createNewCustomer({
      variables: {
        firstName,
        lastName,
        address,
        postalCode,
        city,
        phone,
        email,
      },
    });
  };

  return (
    <IndividualApplicationPage
      applicationId={id}
      handleLinkCustomer={handleLinkCustomer}
      handleCreateCustomer={handleCreateCustomer}
      similarCustomersData={filteredCustomersData}
      customerInfo={customerInfo}
      applicationDetails={applicationDetails}
    />
  );
};

export default IndividualCustomerPageContainer;
