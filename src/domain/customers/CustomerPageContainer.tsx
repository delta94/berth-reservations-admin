import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Notification } from 'hds-react';
import { useLazyQuery } from '@apollo/react-hooks';
import { useDebounce } from 'use-debounce';

import { CUSTOMER_QUERY } from './queries';
import { getCustomersData } from './utils';
import { CUSTOMERS, CUSTOMERSVariables as CUSTOMERS_VARS } from './__generated__/CUSTOMERS';
import CustomerList from './CustomerListComponent';
import CustomersPage from './CustomersPage';
import { usePagination } from '../../common/utils/usePagination';
import { SearchBy } from '../individualApplication/IndividualApplicationPage';
import { usePrevious } from '../../common/utils/usePrevious';

const CustomersPageContainer: React.FC = () => {
  const { t } = useTranslation();

  const [searchBy, setSearchBy] = useState<SearchBy>(SearchBy.LAST_NAME);
  const [searchVal, setSearchVal] = useState<string>('');

  const { cursor, pageSize, pageIndex, getPageCount, goToPage } = usePagination();

  const [debouncedSearchVal] = useDebounce(searchVal, 500, {
    equalityFn: (prev, next) => prev === next,
    leading: true,
  });

  const prevSearchBy = usePrevious(searchBy);

  const filteredCustomersVars = {
    first: pageSize,
    after: cursor,
    [searchBy]: prevSearchBy === searchBy ? debouncedSearchVal : searchVal,
  };

  const [fetchFilteredCustomers, { data, error, called, loading }] = useLazyQuery<CUSTOMERS, CUSTOMERS_VARS>(
    CUSTOMER_QUERY,
    {
      variables: filteredCustomersVars,
    }
  );

  useEffect(() => {
    if (!loading && !called) {
      fetchFilteredCustomers();
    }
  }, [loading, called, fetchFilteredCustomers]);

  useEffect(() => {
    // Go to the first page when search values change.
    goToPage(0);
  }, [searchVal, searchBy, goToPage]);

  if (error)
    return (
      <Notification labelText={t('common.notification.error.label')} type="error">
        {t('common.notification.error.description')}
      </Notification>
    );

  const tableData = getCustomersData(data);

  return (
    <CustomersPage>
      <CustomerList
        loading={loading}
        data={tableData}
        pagination={{
          forcePage: pageIndex,
          pageCount: getPageCount(data?.profiles?.count),
          onPageChange: ({ selected }) => goToPage(selected),
        }}
        tableTools={{
          searchVal,
          searchBy,
          setSearchVal,
          setSearchBy,
          searchByOptions: [
            { value: SearchBy.FIRST_NAME, label: t('common.firstName') },
            { value: SearchBy.LAST_NAME, label: t('common.lastName') },
            { value: SearchBy.EMAIL, label: t('common.email') },
            { value: SearchBy.ADDRESS, label: t('common.address') },
          ],
        }}
      />
    </CustomersPage>
  );
};

export default CustomersPageContainer;
