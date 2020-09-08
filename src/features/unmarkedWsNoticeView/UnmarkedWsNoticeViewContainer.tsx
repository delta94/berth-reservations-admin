import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useParams } from 'react-router-dom';

import UnmarkedWsNoticeView from './UnmarkedWsNoticeView';
import LoadingSpinner from '../../common/spinner/LoadingSpinner';
import { UNMARKED_WINTER_STORAGE_NOTICE_QUERY } from './queries';
import { useDeleteWinterStorageApplication } from '../../common/mutations/deleteBerthApplication';
import { UPDATE_UNMARKED_WINTER_STORAGE_NOTICE_MUTATION } from './mutations';
import {
  UPDATE_UNMARKED_WINTER_STORAGE_NOTICE,
  UPDATE_UNMARKED_WINTER_STORAGE_NOTICEVariables as UPDATE_UNMARKED_WINTER_STORAGE_NOTICE_VARS,
} from './__generated__/UPDATE_UNMARKED_WINTER_STORAGE_NOTICE';
import { getWinterStorageApplicationDetailsData } from './utils';
import {
  UNMARKED_WINTER_STORAGE_NOTICE,
  UNMARKED_WINTER_STORAGE_NOTICEVariables as UNMARKED_WINTER_STORAGE_NOTICE_VARS,
} from './__generated__/UNMARKED_WINTER_STORAGE_NOTICE';
import { getCustomerProfile } from '../customerView/utils';

const UnmarkedWsNoticeViewContainer = () => {
  const { id } = useParams<{ id: string }>();

  const { loading, data } = useQuery<UNMARKED_WINTER_STORAGE_NOTICE, UNMARKED_WINTER_STORAGE_NOTICE_VARS>(
    UNMARKED_WINTER_STORAGE_NOTICE_QUERY,
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

  const [linkCustomer] = useMutation<UPDATE_UNMARKED_WINTER_STORAGE_NOTICE, UPDATE_UNMARKED_WINTER_STORAGE_NOTICE_VARS>(
    UPDATE_UNMARKED_WINTER_STORAGE_NOTICE_MUTATION,
    {
      refetchQueries: [
        {
          query: UNMARKED_WINTER_STORAGE_NOTICE_QUERY,
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
    <UnmarkedWsNoticeView
      customerProfile={customerProfile}
      applicationDetails={applicationDetails}
      winterStorageApplication={data.winterStorageApplication}
      handleDeleteLease={handleDeleteLease}
      handleLinkCustomer={handleLinkCustomer}
    />
  );
};

export default UnmarkedWsNoticeViewContainer;
