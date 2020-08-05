import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { useDebounce } from 'use-debounce';

import { getFilteredCustomersData } from '../utils';
import {
  UPDATE_BERTH_APPLICATION,
  UPDATE_BERTH_APPLICATIONVariables as UPDATE_BERTH_APPLICATION_VARS,
} from '../__generated__/UPDATE_BERTH_APPLICATION';
import { CREATE_NEW_PROFILE_MUTATION, UPDATE_BERTH_APPLICATION_MUTATION } from '../mutations';
import { FILTERED_CUSTOMERS_QUERY, INDIVIDUAL_APPLICATION_QUERY } from '../queries';
import {
  CREATE_NEW_PROFILE,
  CREATE_NEW_PROFILEVariables as CREATE_NEW_PROFILE_VARS,
} from '../__generated__/CREATE_NEW_PROFILE';
import {
  FILTERED_CUSTOMERS,
  FILTERED_CUSTOMERSVariables as FILTERED_CUSTOMERS_VARS,
} from '../__generated__/FILTERED_CUSTOMERS';
import { SearchBy } from '../ApplicationView';
import { usePrevious } from '../../../common/utils/usePrevious';
import { usePagination } from '../../../common/utils/usePagination';
import { useBackendSorting } from '../../../common/utils/useBackendSorting';
import SimilarCustomersTable from './SimilarCustomersTable';
import { INDIVIDUAL_APPLICATION_berthApplication as BERTH_APPLICATION } from '../__generated__/INDIVIDUAL_APPLICATION';

export interface SimilarCustomersTableContainerProps {
  berthApplication: {
    id: BERTH_APPLICATION['id'];
    firstName: BERTH_APPLICATION['firstName'];
    lastName: BERTH_APPLICATION['lastName'];
    address: BERTH_APPLICATION['address'];
    email: BERTH_APPLICATION['email'];
    phoneNumber: BERTH_APPLICATION['phoneNumber'];
    zipCode: BERTH_APPLICATION['zipCode'];
    municipality: BERTH_APPLICATION['municipality'];
  };
}

const SimilarCustomersTableContainer = ({ berthApplication }: SimilarCustomersTableContainerProps) => {
  const { t } = useTranslation();

  const [searchBy, setSearchBy] = useState<SearchBy>(SearchBy.LAST_NAME);
  const prevSearchBy = usePrevious(searchBy);
  const [searchVal, setSearchVal] = useState<string>('');
  const [debouncedSearchVal] = useDebounce(searchVal, 500, {
    equalityFn: (prev, next) => prev === next,
    leading: true,
  });
  const { cursor, pageSize, pageIndex, getPageCount, goToPage } = usePagination();
  const { orderBy, handleSortedColChange } = useBackendSorting(() => goToPage(0));

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

  const [linkCustomer] = useMutation<UPDATE_BERTH_APPLICATION, UPDATE_BERTH_APPLICATION_VARS>(
    UPDATE_BERTH_APPLICATION_MUTATION,
    {
      refetchQueries: [
        {
          query: INDIVIDUAL_APPLICATION_QUERY,
          variables: {
            id: berthApplication.id,
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

  useEffect(() => {
    setSearchVal(berthApplication[searchBy]);
  }, [berthApplication, searchBy]);

  useEffect(() => {
    goToPage(0);
  }, [searchVal, searchBy, goToPage]);

  useEffect(() => {
    // Only fetch customers if the application doesn't have an attached customer.
    if (!called) {
      fetchFilteredCustomers();
    }
  }, [called, fetchFilteredCustomers]);

  const filteredCustomersData = getFilteredCustomersData(customersData);

  const handleLinkCustomer = (customerId: string) =>
    linkCustomer({
      variables: {
        input: { id: berthApplication.id, customerId },
      },
    });

  const handleCreateCustomer = () => {
    const { firstName, lastName, address, email, phoneNumber, zipCode, municipality } = berthApplication;

    createNewCustomer({
      variables: {
        firstName: firstName,
        lastName: lastName,
        address: address,
        postalCode: zipCode,
        city: municipality,
        phone: phoneNumber,
        email: email,
      },
    });
  };

  return (
    <SimilarCustomersTable
      data={filteredCustomersData}
      customersTableTools={{
        searchVal,
        searchBy,
        setSearchVal,
        setSearchBy: (searchBy) => {
          setSearchBy(searchBy);
          setSearchVal(berthApplication[searchBy] ?? '');
        },
        handleCreateCustomer,
        searchByOptions: [
          { value: SearchBy.FIRST_NAME, label: t('common.firstName') },
          { value: SearchBy.LAST_NAME, label: t('common.lastName') },
          { value: SearchBy.EMAIL, label: t('common.email') },
          { value: SearchBy.ADDRESS, label: t('common.address') },
        ],
      }}
      loadingCustomers={loadingCustomers}
      pagination={{
        forcePage: pageIndex,
        pageCount: getPageCount(customersData?.profiles?.count),
        onPageChange: ({ selected }) => goToPage(selected),
      }}
      onSortedColChange={handleSortedColChange({ name: 'lastName' })}
      handleLinkCustomer={handleLinkCustomer}
    />
  );
};

export default SimilarCustomersTableContainer;
