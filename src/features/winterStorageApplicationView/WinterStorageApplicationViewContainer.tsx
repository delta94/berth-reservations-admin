import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useLazyQuery } from '@apollo/react-hooks';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useDebounce } from 'use-debounce';
import { getOperationName } from 'apollo-link';

import WinterStorageApplicationView, { SearchBy } from './WinterStorageApplicationView';
import LoadingSpinner from '../../common/spinner/LoadingSpinner';
import { INDIVIDUAL_WINTER_STORAGE_APPLICATION_QUERY } from './queries';
import { useDeleteBerthApplication } from '../../common/mutations/deleteBerthApplication';
import { UPDATE_WINTER_STORAGE_APPLICATION_MUTATION } from './mutations';
import {
  UPDATE_WINTER_STORAGE_APPLICATION,
  UPDATE_WINTER_STORAGE_APPLICATIONVariables as UPDATE_WINTER_STORAGE_APPLICATION_VARS,
} from './__generated__/UPDATE_WINTER_STORAGE_APPLICATION';
import { getWinterStorageApplicationDetailsData } from './utils';
import { usePagination } from '../../common/utils/usePagination';
import { usePrevious } from '../../common/utils/usePrevious';
import { useBackendSorting } from '../../common/utils/useBackendSorting';
import {
  CREATE_NEW_PROFILE,
  CREATE_NEW_PROFILEVariables as CREATE_NEW_PROFILE_VARS,
} from '../../common/mutations/__generated__/CREATE_NEW_PROFILE';
import { CREATE_NEW_PROFILE_MUTATION } from '../../common/mutations/createProfile';
import {
  INDIVIDUAL_WINTER_STORAGE_APPLICATION,
  INDIVIDUAL_WINTER_STORAGE_APPLICATIONVariables as INDIVIDUAL_WINTER_STORAGE_APPLICATION_VARS,
} from './__generated__/INDIVIDUAL_WINTER_STORAGE_APPLICATION';
import { getFilteredCustomersData } from '../linkApplicationToCustomer/utils';
import { FILTERED_CUSTOMERS_QUERY } from '../linkApplicationToCustomer/queries';
import {
  FILTERED_CUSTOMERS,
  FILTERED_CUSTOMERSVariables as FILTERED_CUSTOMERS_VARS,
} from '../linkApplicationToCustomer/__generated__/FILTERED_CUSTOMERS';
import { getCustomerProfile } from '../customerView/utils';

const WinterStorageApplicationViewContainer = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const [searchBy, setSearchBy] = useState<SearchBy>(SearchBy.LAST_NAME);
  const [searchVal, setSearchVal] = useState<string>('');

  const { loading, data } = useQuery<INDIVIDUAL_WINTER_STORAGE_APPLICATION, INDIVIDUAL_WINTER_STORAGE_APPLICATION_VARS>(
    INDIVIDUAL_WINTER_STORAGE_APPLICATION_QUERY,
    {
      variables: {
        id,
      },
    }
  );

  const { cursor, pageSize, pageIndex, getPageCount, goToPage } = usePagination();
  const { orderBy, handleSortedColChange } = useBackendSorting(() => goToPage(0));

  const [debouncedSearchVal] = useDebounce(searchVal, 500, {
    equalityFn: (prev, next) => prev === next,
    leading: true,
  });

  const prevSearchBy = usePrevious(searchBy);

  const filteredCustomersVars: FILTERED_CUSTOMERS_VARS = {
    first: pageSize,
    after: cursor,
    orderBy,
    [searchBy]: prevSearchBy === searchBy ? debouncedSearchVal : searchVal,
  };

  const [fetchFilteredCustomers, { data: customersData, called, loading: loadingCustomers }] = useLazyQuery<
    FILTERED_CUSTOMERS,
    FILTERED_CUSTOMERS_VARS
  >(FILTERED_CUSTOMERS_QUERY, {
    variables: filteredCustomersVars,
  });

  const [deleteDraftedApplication] = useDeleteBerthApplication();
  useEffect(() => {
    if (!data?.winterStorageApplication) return;

    setSearchVal(data.winterStorageApplication[searchBy]);
  }, [data, searchBy]);

  const customer = data?.winterStorageApplication?.customer;

  useEffect(() => {
    // Only fetch customers if the application doesn't have an attached customer.
    if (!customer && !loading && !called) {
      fetchFilteredCustomers();
    }
  }, [customer, loading, called, fetchFilteredCustomers]);

  useEffect(() => {
    // Go to the first page when search values change.
    if (!customer && !loading) {
      goToPage(0);
    }
  }, [searchVal, searchBy, customer, loading, goToPage]);

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

  const [createNewCustomer] = useMutation<CREATE_NEW_PROFILE, CREATE_NEW_PROFILE_VARS>(CREATE_NEW_PROFILE_MUTATION, {
    refetchQueries: [
      {
        query: FILTERED_CUSTOMERS_QUERY,
        variables: filteredCustomersVars,
      },
    ],
  });

  if (loading || !data?.winterStorageApplication) return <LoadingSpinner isLoading={true} />;

  const handleDeleteLease = (id: string) => {
    deleteDraftedApplication({
      variables: {
        input: {
          id,
        },
      },
    });
  };

  const customerProfile = customer ? getCustomerProfile(customer) : null;

  const applicationDetails = getWinterStorageApplicationDetailsData(
    data.winterStorageApplication,
    data.boatTypes || []
  );

  const filteredCustomersData = !customer ? getFilteredCustomersData(customersData) : null;

  const handleLinkCustomer = (customerId: string) => {
    linkCustomer({
      variables: {
        input: { id, customerId },
      },
    });
  };

  const handleCreateCustomer = () => {
    const { firstName, lastName, primaryAddress, primaryEmail, primaryPhone } = applicationDetails.applicant;
    const phone = primaryPhone || '';
    const email = primaryEmail || '';
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
    <WinterStorageApplicationView
      applicationId={id}
      handleLinkCustomer={handleLinkCustomer}
      loadingCustomers={loadingCustomers}
      customerTableTools={{
        searchVal,
        searchBy,
        setSearchVal,
        setSearchBy: (searchBy) => {
          setSearchBy(searchBy);
          setSearchVal(data?.winterStorageApplication?.[searchBy] ?? '');
        },
        handleCreateCustomer,
        searchByOptions: [
          { value: SearchBy.FIRST_NAME, label: t('common.firstName') },
          { value: SearchBy.LAST_NAME, label: t('common.lastName') },
          { value: SearchBy.EMAIL, label: t('common.email') },
          { value: SearchBy.ADDRESS, label: t('common.address') },
        ],
      }}
      pagination={{
        forcePage: pageIndex,
        pageCount: getPageCount(customersData?.profiles?.count),
        onPageChange: ({ selected }) => goToPage(selected),
      }}
      onSortedColChange={handleSortedColChange({ name: 'lastName' })}
      similarCustomersData={filteredCustomersData}
      customerProfile={customerProfile}
      applicationDetails={applicationDetails}
      refetchQueries={[getOperationName(INDIVIDUAL_WINTER_STORAGE_APPLICATION_QUERY) || 'INDIVIDUAL_APPLICATION']}
      handleDeleteLease={handleDeleteLease}
    />
  );
};

export default WinterStorageApplicationViewContainer;
